import * as express from "express";

import GeneralLedgerController from "../controllers/generalLedger";
import reqValidator, { requestParams } from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get(
    "/migration/general-ledger",
    requestParams.hasCompany, reqValidator,
    GeneralLedgerController.list
  );
  app.get(
    "/migration/general-ledger/:fiscalYear",
    requestParams.hasCode, requestParams.hasCompany, reqValidator,
    GeneralLedgerController.get
  );
  app.post(
    "/migration/general-ledger",
    requestParams.hasCompany, reqValidator,
    GeneralLedgerController.update
  );
  app.put(
    "/migration/general-ledger",
    requestParams.hasCompany, reqValidator,
    GeneralLedgerController.update
  );
  // app.delete(
  //   "/migration/general-ledger",
  //   requestParams.hasCompany, reqValidator,
  //   GeneralLedgerController.delete
  // );
};
