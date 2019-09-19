import * as express from "express";

import CompaniesController from "../controllers/Companies";
import requestErrorValidator, { requestParams } from "../middleware/validators/request";

export default ( app: express.Application ) => {
  // TODO: add request validators
  app.get( "/api/companies", CompaniesController.list);
  app.get( "/api/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.get);
  app.post( "/api/companies", CompaniesController.update);
  app.put("/api/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.update);
  app.delete( "/api/companies/:id", requestParams.hasId, requestErrorValidator, CompaniesController.delete);
};
