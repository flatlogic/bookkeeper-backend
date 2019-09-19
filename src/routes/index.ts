import * as express from "express";
import accounts from "./accounts";
import companies from "./companies";
import generalLedger from "./generalLedger";
import subAccounts from "./subAccounts";

export const register = ( app: express.Application ) => {
  app.get( "/", ( req: any, res ) => {
    res.send("Hello world. Main Page");
  } );
  // add routes here
  accounts( app );
  subAccounts( app );
  generalLedger( app );
  companies( app );
};
