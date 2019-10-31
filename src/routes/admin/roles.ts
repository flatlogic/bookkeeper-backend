import * as express from "express";

import RolesController from "../../controllers/Users/roles";
import requestErrorValidator, { requestParams } from "../../middleware/validators/request";

export default ( app: express.Application ) => {
  app.get(
    "/api/admin/roles",
    RolesController.list,
  );
  app.get(
    "/api/admin/roles/:id",
    requestParams.hasId,
    requestErrorValidator,
    RolesController.get
  );
  app.post(
    "/api/admin/roles",
    RolesController.update
  );
  app.put(
    "/api/admin/roles/:id",
    requestParams.hasId,
    requestErrorValidator,
    RolesController.update
  );
  // app.put(
  //   "/api/admin/roles/:id/update-status",
  //   superUsersValidator.updateStatus,
  //   requestErrorValidator,
  //   RolesController.updateStatus,
  // );
  app.delete(
    "/api/admin/roles/:id",
    RolesController.delete
  );
};
