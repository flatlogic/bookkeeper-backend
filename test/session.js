// Run the login handler against a synthetic repository. The test checks the token
// clients receive, including the case where the selected database row has a hash.
const assert = require("assert").strict;
const bcrypt = require("bcrypt");
const {randomBytes} = require("crypto");
const jwt = require("jsonwebtoken");
require("reflect-metadata");
const db = require("../dist/services/db");
const Authentication = require("../dist/controllers/Authentication").default;

async function checkLoginToken() {
  const secret = randomBytes(32).toString("hex");
  const password = randomBytes(20).toString("hex");
  const user = {
    id: 17, username: "session-test", roles: [],
    password: bcrypt.hashSync(password, 4), passwordToken: randomBytes(16).toString("hex"),
  };
  const query = {
    addSelect() { return this; },
    leftJoinAndSelect() { return this; },
    where() { return this; },
    async getOne() { return user; },
  };
  db.getRepository = async () => ({
    createQueryBuilder: () => query,
    save: async row => row,
  });
  process.env.SECRET = secret;

  let response;
  await Authentication.login(
    {body: {username: user.username, password}},
    {json(body) { response = body; }}
  );
  assert.ok(response.token.startsWith("JWT "));
  const claims = jwt.verify(response.token.slice(4), secret);
  assert.deepEqual(Object.keys(claims).sort(), ["exp", "iat", "id"]);
  assert.equal(claims.id, user.id);
  assert.equal(claims.exp - claims.iat, 7 * 24 * 60 * 60);
  assert.equal(response.user.username, user.username);
  const profile = JSON.parse(JSON.stringify(response.user));
  assert.ok(!Object.hasOwn(profile, "password"));
  assert.ok(!Object.hasOwn(profile, "passwordToken"));
  user.password = null;
  let status;
  await Authentication.login(
    {body: {username: user.username, password}},
    {status(code) { status = code; return this; }, json(body) { response = body; }}
  );
  assert.equal(status, 401);
  assert.ok(!Object.hasOwn(response, "token"));
  console.log("Login signs only the account ID and timestamps, and requires an active password.");
}

async function checkPublicRegistration() {
  const express = require("express");
  const http = require("http");
  const app = express();
  app.use(express.json());
  require("../dist/routes/authentication").default(app);
  const server = app.listen(0, "127.0.0.1");
  try {
    await require("events").once(server, "listening");
    const response = await new Promise((resolve, reject) => {
      const request = http.request({
        hostname: "127.0.0.1", port: server.address().port, path: "/api/register",
        method: "POST", headers: {"Content-Type": "application/json"},
      }, resolve);
      request.on("error", reject);
      request.end(JSON.stringify({username: "signup-test", password: "example"}));
    });
    let body = "";
    for await (const chunk of response) body += chunk;
    assert.equal(response.statusCode, 403);
    assert.ok(!Object.hasOwn(JSON.parse(body), "token"));
    console.log("Public registration is forbidden.");
  } finally {
    server.close();
  }
}

async function main() {
  await checkLoginToken();
  await checkPublicRegistration();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
