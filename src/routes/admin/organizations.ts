import * as express from "express";

import {BASE_ROLES} from "../../constants";
import OrganizationsController from "../../controllers/Organizations/organizations";
import RolesController from "../../controllers/Users/roles";
import { checkOrg } from "../../middleware/validators/auth";
import authentication from "../../middleware/validators/auth";
import requestErrorValidator, { requestParams } from "../../middleware/validators/request";

export default ( app: express.Application ) => {
  app.all( "/api/admin/organizations/*", authentication([BASE_ROLES.superUser, BASE_ROLES.admin]));
  app.get( "/api/admin/organizations", OrganizationsController.list);
  app.get( "/api/admin/organizations/check-name", requestErrorValidator, OrganizationsController.checkNameAvailable);
  app.get( "/api/admin/organizations/:id", requestParams.hasId, requestErrorValidator, OrganizationsController.get);
  app.post( "/api/admin/organizations", OrganizationsController.update);
  app.put(
    "/api/admin/organizations/:id",
    requestParams.hasId,
    requestErrorValidator,
    OrganizationsController.update
  );
  app.delete( "/api/admin/organizations/:id", OrganizationsController.delete);

  app.get( "/api/admin/organizations/:orgId/roles", checkOrg, RolesController.list);
  app.get( "/api/admin/organizations/:orgId/roles/:id", RolesController.get);
  app.post( "/api/admin/organizations/:orgId/roles/:id", RolesController.update);
  app.put( "/api/admin/organizations/:orgId/roles/:id", RolesController.update);
  app.delete( "/api/admin/organizations/:orgId/roles/:id", RolesController.delete);
};
