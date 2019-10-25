import * as express from "express";

import DictionariesController from "../../controllers/Dictionaries";

export default ( app: express.Application ) => {
  app.get( "/api/admin/dictionaries/users", DictionariesController.users);
  app.get( "/api/admin/dictionaries/roles", DictionariesController.roles);
  app.get( "/api/admin/dictionaries/companies", DictionariesController.companies);
};
