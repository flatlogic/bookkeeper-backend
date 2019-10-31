import * as express from "express";

import AuthenticationController from "../controllers/Authentication";
import authValidator from "../middleware/validators/authentication/index";
import requestErrorValidator from "../middleware/validators/request";

export default ( app: express.Application ) => {
  app.post( "/api/login", authValidator.login, requestErrorValidator, AuthenticationController.login);
  app.post(
    "/api/password/set-password",
    authValidator.setPassword,
    requestErrorValidator,
    AuthenticationController.setPassword
  );
  app.post(
    "/api/password/reset-password",
    authValidator.resetPassword,
    requestErrorValidator,
    AuthenticationController.resetPassword
  );
};
