import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import path from "path";
import "reflect-metadata";

import * as routes from "./routes";
import * as authentication from "./services/authentication";
import * as db from "./services/db";

dotenv.config();

const port = process.env.PORT;
const app = express();

// Init DB connection
db.init();
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

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ port }`);
});
