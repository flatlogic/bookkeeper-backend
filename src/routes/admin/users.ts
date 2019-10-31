import * as express from "express";

import UsersController from "../../controllers/Users/users";
import superUsersValidator from "../../middleware/validators/admin/superUsers/superUsers";
import requestErrorValidator, { requestParams } from "../../middleware/validators/request";

export default ( app: express.Application ) => {
  // app.all( "/api/admin/users/*", authentication([BASE_ROLES.admin, BASE_ROLES.superUser]));
  app.get(
    "/api/admin/users",
    UsersController.list,
  );
  app.get(
    "/api/admin/users/check-username",
    UsersController.checkUsernameAvailable
  );
  app.get(
    "/api/admin/users/:id",
    requestParams.hasId,
    requestErrorValidator,
    UsersController.get
  );
  app.post(
    "/api/admin/users",
    UsersController.update
  );
  app.put(
    "/api/admin/users/:id",
    requestParams.hasId,
    requestErrorValidator,
    UsersController.update
  );
  app.put(
    "/api/admin/users/:id/update-status",
    superUsersValidator.updateStatus,
    requestErrorValidator,
    UsersController.updateStatus,
  );
  app.put(
    "/api/admin/users/:id/set-roles",
    requestParams.hasId,
    requestErrorValidator,
    UsersController.setRoles
  );
  app.post(
    "/api/admin/users/:id/send-invitation",
    requestParams.hasId,
    requestErrorValidator,
    UsersController.sendInvitation,
  );
  app.delete(
    "/api/admin/users/:id",
    UsersController.delete
  );
};
