import * as express from "express";

import AccountsController from "../controllers/customers";
import reqValidator, { requestParams } from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get(
    "/migration/customers",
    requestParams.hasCompany, reqValidator,
    AccountsController.list
  );
  app.get(
    "/migration/customers/:code",
    requestParams.hasCode, requestParams.hasCompany, reqValidator,
    AccountsController.get
  );
  app.post(
    "/migration/customers",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.put(
    "/migration/customers",
    requestParams.hasCompany, reqValidator,
    AccountsController.update
  );
  app.delete(
    "/migration/customers",
    requestParams.hasCompany, reqValidator,
    AccountsController.delete
  );
};
