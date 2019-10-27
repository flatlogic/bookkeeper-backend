"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subAccounts_1 = __importDefault(require("../controllers/Accounts/subAccounts"));
const accounts_1 = __importDefault(require("../middleware/validators/accounts/accounts"));
const subAccounts_2 = __importDefault(require("../middleware/validators/accounts/subAccounts"));
const request_1 = __importDefault(require("../middleware/validators/request"));
exports.default = (app) => {
    app.get("/api/subaccounts", accounts_1.default.list, request_1.default, subAccounts_1.default.list);
    app.get("/api/subaccounts/:id", accounts_1.default.hasId, request_1.default, subAccounts_1.default.get);
    app.post("/api/subaccounts", subAccounts_2.default.create, request_1.default, subAccounts_1.default.update);
    app.put("/api/subaccounts/:id", accounts_1.default.hasId, subAccounts_2.default.create, request_1.default, subAccounts_1.default.update);
    app.delete("/api/subaccounts/:id", accounts_1.default.hasId, request_1.default, subAccounts_1.default.delete);
};
//# sourceMappingURL=subAccounts.js.map