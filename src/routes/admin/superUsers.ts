import * as express from "express";

import {BASE_ROLES} from "../../constants";
import SuperUsersController from "../../controllers/Users/superUsers";
import superUsersValidator from "../../middleware/validators/admin/superUsers/superUsers";
import authentication from "../../middleware/validators/auth";
import requestErrorValidator, { requestParams } from "../../middleware/validators/request";

export default ( app: express.Application ) => {
  app.all( "/api/admin/super-users/*", authentication([BASE_ROLES.superUser]));
  app.get( "/api/admin/super-users", SuperUsersController.list);
  app.get( "/api/admin/super-users/:id", requestParams.hasId, requestErrorValidator, SuperUsersController.get);
  app.post( "/api/admin/super-users", SuperUsersController.update);
  app.put(
    "/api/admin/super-users/:id/update-status",
    superUsersValidator.updateStatus,
    requestErrorValidator,
    SuperUsersController.updateStatus,
  );
  app.put(
    "/api/admin/super-users/:id",
    requestParams.hasId,
    requestErrorValidator,
    SuperUsersController.update
  );
  app.delete( "/api/admin/super-users/:id", SuperUsersController.delete);
};
