import * as express from "express";

import resolveAccountParent from "../middleware/accountParent";
import requireAssignedCompany from "../middleware/selectedCompany";

import AccountsController from "../controllers/Accounts/accounts";
import AccountsBudgetController from "../controllers/Accounts/accountsBudget";
import accountsValidators from "../middleware/validators/accounts/accounts";
import budgetsValidators from "../middleware/validators/accounts/budgets";
import auth from "../middleware/validators/auth";
import authentication from "../middleware/validators/auth";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.use("/api/accounts", authentication([]), requireAssignedCompany);

  app.get(
    "/api/accounts",
    // auth([], {gl: "read"}),
    accountsValidators.list,
    requestErrorValidator,
    AccountsController.list
  );
  app.get(
    "/api/accounts/:id/budget",
    accountsValidators.hasId,
    requestErrorValidator,
    AccountsBudgetController.getBudget
  );
  app.get( "/api/accounts/check-code", AccountsController.checkCodeAvailable);
  app.get( "/api/accounts/:id", accountsValidators.hasId, requestErrorValidator, AccountsController.get);
  app.post( "/api/accounts", accountsValidators.create, requestErrorValidator, resolveAccountParent, AccountsController.update);
  app.put(
    "/api/accounts/:id",
    accountsValidators.hasId,
    requestErrorValidator,
    resolveAccountParent,
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
};
