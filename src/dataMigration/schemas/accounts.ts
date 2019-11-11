// @ts-ignore
import objectMapper from "object-mapper";

import accountBudgetSchema from "./accountBudget";

const schema = {
  GLAccountCode: "code",
  RecordStatus: {
    key: "status",
    transform: (value: string) => +value,
    default: 1,
  },
  FiscalCentury: {
    key: "fiscalCentury",
    transform: (value: string, data: any) => `${value}${data.FiscalYear}`,
    default: 1,
  },
  Description: "description",
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
    default: 1,
  },
  JobFlag: {
    key: "restriction",
    transform: (value: string) => {
      switch (value.toLowerCase()) {
        case "x":
          return "njt";
        case "e":
          return "jet";
        case "i":
          return "jit";
        default:
          return null;
      }
    },
    default: 1,
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
