import * as express from "express";
import accounts from "./accounts";
import admin from "./admin";
import authentication from "./authentication";
import customers from "./customers";
import generalLedger from "./generalLedger";
import subAccounts from "./subAccounts";
import users from "./users";

import migration from "../dataMigration/routes";

export const register = ( app: express.Application ) => {
  app.get( "/", ( req: any, res ) => {
    res.send("Hello world. Main Page");
  } );

  migration(app);
  // add routes here
  accounts( app );
  subAccounts( app );
  generalLedger( app );
  admin( app );
  authentication( app );
  users( app );
  customers( app );
};
