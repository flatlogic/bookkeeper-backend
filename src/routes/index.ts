import * as express from "express";
import accounts from "./accounts";
import admin from "./admin";
import authentication from "./authentication";
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
  admin( app );
  authentication( app );
};
