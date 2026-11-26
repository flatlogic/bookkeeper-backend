const assert = require("assert").strict;
require("reflect-metadata");
const db = require("../dist/services/db");
const Accounts = require("../dist/models/Accounts").default;
const SubAccounts = require("../dist/controllers/Accounts/subAccounts").default;
const resolveParent = require("../dist/middleware/accountParent").default;

async function main() {
  const company = {id: 1};
  const secondCompany = {id: 2};
  const mainAccount = new Accounts({code: "1000", company, isSubAccount: false});
  mainAccount.id = 10;
  const own = new Accounts({code: "1001", company, isSubAccount: true, description: "Office"});
  own.id = 11;
  const other = new Accounts({code: "2001", company: secondCompany, isSubAccount: true, description: "Travel"});
  other.id = 21;
  const accounts = [mainAccount, own, other];
  const saved = [];
  db.getRepository = async () => ({
    async findOneBy(where) {
      assert.equal(where.company.id, company.id);
      return accounts.find(row => row.id === where.id && row.company.id === where.company.id &&
        row.isSubAccount === where.isSubAccount) || null;
    },
    async save(row) { saved.push(row); return row; },
  });
  const user = {lastCompanySelected: company};
  const body = {code: own.code, description: "Supplies", parent: {id: mainAccount.id}};
  const response = {
    code: 200,
    status(code) { this.code = code; return this; },
    json(data) { this.data = data; },
  };
  let resolved = false;
  await resolveParent({user, body}, response, () => { resolved = true; });
  assert.ok(resolved);
  assert.equal(body.parent, mainAccount);
  await SubAccounts.update({params: {id: own.id}, body, user}, response);
  assert.equal(response.code, 200);
  assert.deepEqual(saved, [own]);
  assert.equal(own.description, "Supplies");
  assert.equal(own.parent, mainAccount);
  assert.equal(own.company, company);
  assert.equal(own.isSubAccount, true);

  await SubAccounts.update({params: {id: other.id}, body, user}, response);
  assert.equal(response.code, 404);
  assert.equal(other.description, "Travel");
  assert.equal(saved.length, 1);
  console.log("Subaccount edits and parent lookups are scoped to the selected company.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
