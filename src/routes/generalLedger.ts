import * as express from "express";

import GeneralLedgerController from "../controllers/GeneralLedger";

export default ( app: express.Application ) => {
  app.get( "/api/general-ledger", GeneralLedgerController.get);
  app.post( "/api/general-ledger", GeneralLedgerController.update);
};
