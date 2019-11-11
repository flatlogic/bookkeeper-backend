import * as express from "express";

import OrganizationsController from "../controllers/organizations";
import authenticator from "../middleware/authenticator";
import accounts from "../routes/accounts";

export default ( app: express.Application ) => {
  app.all("/migration/*", authenticator);

  app.get(
    "/migration/organization",
    OrganizationsController.get,
  );

  accounts( app );
};
