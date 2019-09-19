import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";

import * as routes from "./routes";
import * as db from "./services/db";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// Init DB connection
db.init();
// Parse incoming JSON data
app.use( express.json() );
// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );
// Configure routes
routes.register(app);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ port }`);
});
