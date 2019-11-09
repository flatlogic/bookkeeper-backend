import * as express from "express";

import GeneralLedgerController from "../controllers/GeneralLedger";
import authentication from "../middleware/validators/auth";

export default ( app: express.Application ) => {
  app.all( "/api/general-ledger*", authentication([]));

  app.get( "/api/general-ledger", GeneralLedgerController.get);
  app.post( "/api/general-ledger", GeneralLedgerController.update);
};
