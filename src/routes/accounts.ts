import * as express from "express";

import AccountsController from "../controllers/Accounts/accounts";
import AccountsBudgetController from "../controllers/Accounts/accountsBudget";
import accountsValidators from "../middleware/validators/accounts/accounts";
import budgetsValidators from "../middleware/validators/accounts/budgets";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get( "/api/accounts", accountsValidators.list, requestErrorValidator, AccountsController.list);
  app.get( "/api/accounts/:id", accountsValidators.hasId, requestErrorValidator, AccountsController.get);
  app.post( "/api/accounts", accountsValidators.create, requestErrorValidator, AccountsController.update);
  app.put(
    "/api/accounts/:id",
    accountsValidators.hasId,
    accountsValidators.create,
    requestErrorValidator,
    AccountsController.update
  );
  app.delete( "/api/accounts/:id", accountsValidators.hasId, requestErrorValidator, AccountsController.delete);
  app.post(
    "/api/accounts/:id/budget",
    accountsValidators.hasId,
    budgetsValidators.spreadBudget,
    requestErrorValidator,
    AccountsBudgetController.setBudget
  );
  app.get(
    "/api/accounts/:id/budget",
    accountsValidators.hasId,
    requestErrorValidator,
    AccountsBudgetController.getBudget
  );
};
