import * as express from "express";

import AuthenticationController from "../controllers/Authentication";
import authValidator from "../middleware/validators/authentication/index";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.post( "/api/login", authValidator.login, requestErrorValidator, AuthenticationController.login);
  app.post(
    "/api/set-password",
    authValidator.setPassword,
    requestErrorValidator,
    AuthenticationController.setPassword
  );
};
