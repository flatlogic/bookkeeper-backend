"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("./accounts"));
const admin_1 = __importDefault(require("./admin"));
const authentication_1 = __importDefault(require("./authentication"));
const generalLedger_1 = __importDefault(require("./generalLedger"));
const subAccounts_1 = __importDefault(require("./subAccounts"));
exports.register = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello world. Main Page");
    });
    // add routes here
    accounts_1.default(app);
    subAccounts_1.default(app);
    generalLedger_1.default(app);
    admin_1.default(app);
    authentication_1.default(app);
};
//# sourceMappingURL=index.js.map