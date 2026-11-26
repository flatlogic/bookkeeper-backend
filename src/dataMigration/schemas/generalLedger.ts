import moment from "moment";
// @ts-ignore
import objectMapper from "object-mapper";

import Accounts from "../../models/Accounts";
import { ledgerInteger } from "../../models/GeneralLedger";
import { getRepository } from "../../services/db";
import generalLedgerPeriodsSchema from "./generalLedgerPeriods";

const schema = {
  LastJournalNumPosted: "lastJournalPosted",
  LastFiscalYearGLPosted: "lastFiscalYearPosted",
  LastFiscalPeriodGLPosted: "lastFiscalPeriodPosted",
  LastFiscalYearOperBalPosted: "lastFiscalYearBalancePosted",
  CurrentBankRecDate: "reconciliationDate",
  DateCurrentFYWasOpened: {
    key: "currentFiscalYearOpenedDate",
    transform: (value: string) => {
      try {
        return value ? moment(value, "DD/MM/YY") : null;
      } catch (e) {
        return null;
      }
    },
  },
  CalYearOf1stPerOfFiscalYear: "calYearOf1stPerOfFiscalYear",
  CurBankStatementBal: "currentBankBalance",
};

export default async (data: any, companyId: number) => {
  const currentFiscalYear = ledgerInteger(data.CurrentFiscalYear);
  if (!Number.isInteger(currentFiscalYear) || currentFiscalYear < 1000 || currentFiscalYear > 9999) {
    throw new Error("CurrentFiscalYear must be a four-digit year");
  }

  const result = objectMapper(data, schema);
  result.currentFiscalYear = currentFiscalYear;
  result.budget = generalLedgerPeriodsSchema(data);
  if (data.PriorFYStatusFlag !== undefined) {
    const flag = data.PriorFYStatusFlag;
    if (typeof flag !== "string" || !["", "O", "C"].includes(flag.trim().toUpperCase())) {
      throw new Error("PriorFYStatusFlag must be empty, O or C");
    }
    result.isPriorFiscalYearClosed = flag.trim().toUpperCase() === "C";
  }

  const accounts = await getRepository(Accounts);
  for (const [source, target, isSubAccount] of [
    ["RetEarningsAccount", "retainedEarningsAccount", false],
    ["RetEarningsSubAcnt", "retainedEarningsSubAccount", true],
  ] as const) {
    if (data[source] === undefined) {
      continue;
    }
    if (data[source] === "" || data[source] === null) {
      result[target] = null;
      continue;
    }
    if (typeof data[source] !== "string" && typeof data[source] !== "number") {
      throw new Error(source + " must be an account code");
    }
    const account = await accounts.findOne({where: {code: data[source], company: companyId, isSubAccount}});
    if (!account) {
      throw new Error(source + " not found in this company");
    }
    result[target] = account;
  }
  return result;
};
