const assert = require("assert").strict;
require("reflect-metadata");
const {validateSync} = require("class-validator");
const GeneralLedger = require("../dist/models/GeneralLedger").default;
const importPeriods = require("../dist/dataMigration/schemas/generalLedgerPeriods").default;

const form = {currentFiscalYear: 2026, calendarYearPeriod1: null, company: {id: 7}};
const row = {};
const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
for (let i = 1; i <= 12; i++) {
  form[`period${i}Month`] = (i + 8) % 12 + 1;
  form[`period${i}Status`] = i === 2 ? 0 : 1;
  row[`Period${i}Description`] = months[i - 1];
  row[`Period${i}Status`] = i === 2 ? "C" : "";
}

const ledger = new GeneralLedger(form);
const imported = new GeneralLedger({currentFiscalYear: "2026", budget: importPeriods(row)});
for (const entity of [ledger, imported]) {
  assert.deepEqual(validateSync(entity), []);
  assert.equal(entity.period1Month, "10");
  assert.equal(entity.period2Status, 0);
  assert.equal(entity.currentFiscalYear, 2026);
}

ledger.set({period3Status: 0, company: {id: 9}});
assert.deepEqual(validateSync(ledger), []);
assert.equal(ledger.company.id, 7);
assert.equal(ledger.period2Month, "11");
assert.equal(ledger.period3Status, 0);

for (const [field, invalid] of [
  ["period1Month", "unknown"], ["period12Month", 13], ["period2Status", 2],
  ["currentFiscalYear", "202x"], ["calendarYearPeriod1", 3], ["isPriorFiscalYearClosed", "sometimes"],
]) {
  const candidate = new GeneralLedger({...form, [field]: invalid});
  assert.ok(validateSync(candidate).some(error => error.property === field), field);
}

const invalidImport = new GeneralLedger({
  currentFiscalYear: 2026,
  budget: importPeriods({...row, Period1Description: "unknown", Period12Status: "invalid"}),
});
assert.deepEqual(validateSync(invalidImport).map(error => error.property).sort(), ["period12Status", "period1Month"]);
console.log("General ledger validation passed for form values, imported periods, partial updates and invalid values.");
