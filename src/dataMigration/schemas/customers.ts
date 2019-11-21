import moment from "moment";
// @ts-ignore
import objectMapper from "object-mapper";

import Accounts from "../../models/Accounts";
import { getRepository } from "../../services/db";

const schema = {
  CustomerCode: "code",
  CustomerName: "name",
  ContactPerson: "contactPerson",
  InvoiceTermsMessage: "invoiceTermsMessage",
  LateChargeExemptFlag: {
    key: "isExemptForLateFee",
    transform: (value: string) => !value,
  },
  BillingsThisYear: "thisYearBillings",
  BillingsLastYear: "lastYearBillings",
  BillingsToDate: "toDateBillings",
  DefaultSalesTaxRate: "defaultSalesTaxRate",
  NonJobDefaultGLAccount: {
    key: "defaultAccount",
    transform: async (value: string) => {
      if (!value) {
        return null;
      }

      const accountsRepository = await getRepository(Accounts);
      const account = await accountsRepository.findOne({code: value});
      if (!account) {
        throw new Error("NonJobDefaultGLAccount not found");
      }
      return account;
    }
  },
  NonJobDefaultGLSubAcnt: {
    key: "defaultSubAccount",
    transform: async (value: string) => {
      if (!value) {
        return null;
      }

      const accountsRepository = await getRepository(Accounts);
      const account = await accountsRepository.findOne({code: value, isSubAccount: true});
      if (!account) {
        throw new Error("NonJobDefaultGLSubAcnt not found");
      }
      return account;
    }
  },
  CurrentARAmount: "currentYearBillings", // ?
  // "CurrentUnappliedCashOnDep": "", // ?
  PrintStatementFlag: {
    key: "isPrintStatements",
    transform: (value: string) => !value,
  },
  NormalSTStateCode: "defaultSalesTaxStateCode",
  NormalSTDistrictCode: "defaultSalesTaxDistrictCode",
  // "NormalBillingRateFlag": "", // ?
  LastCustPaymentDate: {
    key: "lastPaymentDate",
    transform: (value: string) => {
      try {
        return value ? moment(value, "DD/MM/YY") : null;
      } catch (e) {
        return null;
      }
    },
  },
  // "LastSBWorksiteNumThisCust": "", // ?
  company: "company",

  // "CustAddressLine1": "",
  // "CustAddressLine2": "",
  // "CustCity": "",
  // "CustState": "",
  // "CustZipCode": "",
  // "CustZipExt": "",
  // "CustTelAreaCode": "",
  // "CustTelPrefix": "",
  // "CustTelNumber": "",
  // "FaxAreaCode": "",
  // "FaxPrefix": "",
  // "FaxNumber": "",
};

export default async (data: any) => {
  const result = await objectMapper(data, schema);
  result.defaultAccount = await result.defaultAccount;
  result.defaultSubAccount = await result.defaultSubAccount;
  return result;
};
