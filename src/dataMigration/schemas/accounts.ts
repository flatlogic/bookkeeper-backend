// @ts-ignore
import objectMapper from "object-mapper";

import { RESTRICTIONS } from "../../models/Accounts";
import accountBudgetSchema from "./accountBudget";
import handle from "./handlers";

const schema = {
  GLAccountCode: {
    key: "code",
    transform: (value: string) => handle(value),
  },
  RecordStatus: {
    key: "status",
    transform: (value: string) => !+handle(value) ? 1 : 0,
    default: 1,
  },
  FiscalCentury: {
    key: "fiscalYear",
    transform: (value: string, data: any) => `${value}${data.FiscalYear}`,
    default: 1,
  },
  Description: {
    key: "description",
    transform: (value: string) => handle(value),
  },
  AccountType: {
    key: "type",
    transform: (value: string) => {
      switch (value.toLowerCase()) {
        case "a":
        case "l":
        case "i":
        case "e":
          return value.toLowerCase();
        default:
          return null;
      }
    },
  },
  JobFlag: {
    key: "restriction",
    transform: (value: string) => {
      switch (value.toLowerCase()) {
        case "x":
          return RESTRICTIONS.nonJob;
        case "e":
          return RESTRICTIONS.jobExpense;
        case "i":
          return RESTRICTIONS.jobIncome;
        case "s":
          return RESTRICTIONS.serviceTransactions;
        case "eq":
          return RESTRICTIONS.equipmentOnly;
        default:
          return null;
      }
    },
  },
  JobCostOrIncomeTypeFlag: {
    key: "restrictionSubType",
    transform: (value: string) => {
      switch (handle(value)) {
        case "1":
          return RESTRICTIONS.nonJob;
        case "2":
          return "jet";
        case "3":
          return "jit";
        case "4":
          return "sbt";
        case "5":
          return RESTRICTIONS.nonJob;
        case "6":
          return "jet";
        case "7":
          return "jit";
        default:
          return null;
      }
    },
  },
  Period13YearEndAdjAmntToDate: "endYearAdjustmentBudget",
  isSubAccount: "isSubAccount",
  parent: "parent",
  Period0AmountToDate: {
    key: "budget",
    transform: (value: string, data: any) => {
      return accountBudgetSchema(data);
    },
    default: {},
  },
  PostingFlag: {
    key: "isPosted",
    transform: (value: string) => value.toLowerCase() === "p",
  },
  company: "company",
};

export default (data: any) => objectMapper(data, schema);
