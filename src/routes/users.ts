import * as express from "express";

import UsersController from "../controllers/Users/publicUsers";
import authentication from "../middleware/validators/auth";

export default ( app: express.Application ) => {
  app.all( "/api/users*", authentication([]));
  app.put(
    "/api/users",
    UsersController.update,
  );
  app.post(
    "/api/users/select-company",
    UsersController.selectCompany,
  );
};
