const assert = require("node:assert/strict");
const nodemailer = require("nodemailer");
const Mailer = require("../dist/services/mailer").default;

async function main() {
  process.env.SMTP_FROM = "bookkeeper@example.invalid";
  Mailer.transporter = nodemailer.createTransport({jsonTransport: true});
  const recipient = "member@example.invalid";
  const link = "https://example.invalid/set-password?token=fixture&lang=en";
  const data = {firstName: "River & Moss", lastName: "Lane", organizationName: "North <Co>", link};

  for (const [template, subject, instruction] of [
    ["activation", "CP for Web Invitation", "activate your account"],
    ["resetPassword", "CP for Web. Reset link", "set new password"],
  ]) {
    const result = await Mailer.sendTemplate(recipient, subject, template, data);
    const message = JSON.parse(result.message);
    assert.equal(message.from.address, process.env.SMTP_FROM);
    assert.equal(message.to[0].address, recipient);
    assert.equal(message.subject, subject);
    assert.ok(message.html.includes("Hello River &amp; Moss Lane!"));
    assert.ok(message.html.includes('href="https://example.invalid/set-password?token=fixture&amp;lang=en"'));
    assert.ok(message.html.includes(instruction));
    if (template === "activation") {
      assert.ok(message.html.includes("North &lt;Co&gt;"));
    }
  }
  console.log("Invitation and password reset emails preserve recipients, content and links.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
