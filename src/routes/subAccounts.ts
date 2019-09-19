import * as express from "express";

import SubAccountsController from "../controllers/Accounts/subAccounts";
import accountsValidators from "../middleware/validators/accounts/accounts";
import subAccountsValidators from "../middleware/validators/accounts/subAccounts";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get( "/api/subaccounts", accountsValidators.list, requestErrorValidator, SubAccountsController.list);
  app.get( "/api/subaccounts/:id", accountsValidators.hasId, requestErrorValidator, SubAccountsController.get);
  app.post( "/api/subaccounts", subAccountsValidators.create, requestErrorValidator, SubAccountsController.update);
  app.put(
    "/api/subaccounts/:id",
    accountsValidators.hasId,
    subAccountsValidators.create,
    requestErrorValidator,
    SubAccountsController.update
  );
  app.delete( "/api/subaccounts/:id", accountsValidators.hasId, requestErrorValidator, SubAccountsController.delete);
};
