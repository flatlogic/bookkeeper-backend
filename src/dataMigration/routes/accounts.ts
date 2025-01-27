import * as express from "express";

import AccountsController from "../controllers/accounts";
import reqValidator, { requestParams } from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get(
    "/migration/accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.list
  );
  app.get(
    "/migration/accounts/:code",
    requestParams.hasCode, requestParams.hasCompany, reqValidator,
    AccountsController.get
  );
  app.post(
    "/migration/accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.put(
    "/migration/accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.delete(
    "/migration/accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.delete
  );

  app.get(
    "/migration/sub-accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.list
  );
  app.get(
    "/migration/sub-accounts/:code",
    requestParams.hasCode, requestParams.hasCompany, reqValidator,
    AccountsController.get
  );
  app.post(
    "/migration/sub-accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.put(
    "/migration/sub-accounts",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.delete(
    "/migration/sub-accounts",
    AccountsController.delete
  );
};
