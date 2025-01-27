import * as express from "express";

import CompaniesController from "../../controllers/Companies";
import superUsersValidator from "../../middleware/validators/admin/superUsers/superUsers";
import requestErrorValidator, { requestParams } from "../../middleware/validators/request";

export default ( app: express.Application ) => {
  // TODO: add request validators
  app.get( "/api/admin/companies", CompaniesController.list);
  app.get( "/api/admin/companies/check-code", requestErrorValidator, CompaniesController.checkCodeAvailable);
  app.get( "/api/admin/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.get);
  app.post( "/api/admin/companies", CompaniesController.update);
  app.put("/api/admin/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.update);
  app.put(
    "/api/admin/companies/:id/update-status",
    superUsersValidator.updateStatus,
    requestErrorValidator,
    CompaniesController.updateStatus,
  );
  app.delete( "/api/admin/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.delete);
};
