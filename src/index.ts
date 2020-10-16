import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import passport from "passport";
import path from "path";
import "reflect-metadata";

import * as routes from "./routes";
import * as authentication from "./services/authentication";
import * as db from "./services/db";
import Mailer from "./services/mailer";

dotenv.config();

const port = process.env.PORT;
const app = express();

// Init DB connection
db.init();
// Init Mailer connection
Mailer.init();
// CORS
app.use(cors({credentials: true, origin: true, maxAge: 600}));
// Parse incoming JSON data
app.use( express.json() );
// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );
// Configure Authentication
app.use(passport.initialize());
app.use(passport.session());
authentication.init(passport);
// Configure routes
routes.register(app);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send("Something went wrong");
});

process.on("unhandledRejection", (reason: any) => {
  console.error("Something went wrong", reason.stack || reason);
});

cron.schedule("5 * * * * *", () => {
  exec("npm run migrate:run", (err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log("send");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ port }`);
});
