import moment from "moment";
// @ts-ignore
import objectMapper from "object-mapper";

import Accounts from "../../models/Accounts";
import { getRepository } from "../../services/db";
import generalLedgerPeriodsSchema from "./generalLedgerPeriods";

const schema = {
  Period1Description: {
    key: "budget",
    transform: (value: string, data: any) => generalLedgerPeriodsSchema(data),
    default: {},
  },
  RetEarningsAccount: {
    key: "retainedEarningsAccount",
    transform: async (value: string) => {
      if (!value) {
        return null;
      }

      const accountsRepository = await getRepository(Accounts);
      const account = await accountsRepository.findOne({code: value});
      if (!account) {
        throw new Error("RetEarningsAccount not found");
      }
      return account;
    },
  },
  RetEarningsSubAcnt: {
    key: "retainedEarningsSubAccount",
    transform: async (value: string) => {
      if (!value) {
        return null;
      }

      const accountsRepository = await getRepository(Accounts);
      const subAccount = await accountsRepository.findOne({code: value, isSubAccount: true});
      if (!subAccount) {
        throw new Error("RetEarningsSubAcnt not found");
      }
      return subAccount;
    },
  },
  LastJournalNumPosted: "lastJournalPosted",
  LastFiscalYearGLPosted: "lastFiscalYearPosted",
  LastFiscalPeriodGLPosted: "lastFiscalPeriodPosted",
  CurrentFiscalYear: "currentFiscalYear",
  LastFiscalYearOperBalPosted: "lastFiscalYearBalancePosted",
  CurrentBankRecDate: "reconciliationDate",
  PriorFYStatusFlag: {
    key: "isPriorFiscalYearClosed",
    transform: (value: string) => value.toLowerCase() === "c",
    default: {},
  },
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
  company: "company",
};

export default async (data: any) => {
  const result = await objectMapper(data, schema);
  result.retainedEarningsAccount = await result.retainedEarningsAccount;
  result.retainedEarningsSubAccount = await result.retainedEarningsSubAccount;
  return result;
};
