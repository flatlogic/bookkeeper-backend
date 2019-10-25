import * as express from "express";

import { BASE_ROLES } from "../../constants";
import authentication from "../../middleware/validators/auth";
import companies from "./companies";
import dictionaries from "./dictionaries";
import adminOrganizations from "./organizations";
import adminSuperUsers from "./superUsers";
import users from "./users";

export default ( app: express.Application ) => {
  app.all( "/api/admin/*", authentication([BASE_ROLES.superUser, BASE_ROLES.admin]));
  adminOrganizations( app );
  adminSuperUsers( app );
  dictionaries( app );
  companies( app );
  users( app );
};
