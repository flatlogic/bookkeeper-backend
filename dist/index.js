"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const routes = __importStar(require("./routes"));
const authentication = __importStar(require("./services/authentication"));
const db = __importStar(require("./services/db"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const app = express_1.default();
// Init DB connection
db.init();
// CORS
app.use(cors_1.default({ credentials: true, origin: true, maxAge: 600 }));
// Parse incoming JSON data
app.use(express_1.default.json());
// Configure Express to serve static files in the public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Configure Authentication
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
authentication.init(passport_1.default);
// Configure routes
routes.register(app);
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map