import * as express from "express";

import CustomersController from "../controllers/Customers/customers";
import accountsValidators from "../middleware/validators/accounts/accounts";
import auth from "../middleware/validators/auth";
import authentication from "../middleware/validators/auth";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.all( "/api/customers*", authentication([]));

  app.get(
    "/api/customers",
    // auth([], {gl: "read"}),
    CustomersController.list
  );
  app.get( "/api/customers/check-code", CustomersController.checkCodeAvailable);
  app.get( "/api/customers/:id", accountsValidators.hasId, requestErrorValidator, CustomersController.get);
  app.post( "/api/customers", CustomersController.update);
  app.put(
    "/api/customers/:id",
    accountsValidators.hasId,
    requestErrorValidator,
    CustomersController.update
  );
  app.delete( "/api/customers/:id", accountsValidators.hasId, requestErrorValidator, CustomersController.delete);
};
