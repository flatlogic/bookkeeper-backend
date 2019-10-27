"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("../controllers/Accounts/accounts"));
const accountsBudget_1 = __importDefault(require("../controllers/Accounts/accountsBudget"));
const accounts_2 = __importDefault(require("../middleware/validators/accounts/accounts"));
const budgets_1 = __importDefault(require("../middleware/validators/accounts/budgets"));
const auth_1 = __importDefault(require("../middleware/validators/auth"));
const request_1 = __importDefault(require("../middleware/validators/request"));
exports.default = (app) => {
    app.get("/api/accounts", auth_1.default([], { gl: "read" }), accounts_2.default.list, request_1.default, accounts_1.default.list);
    app.get("/api/accounts/:id", accounts_2.default.hasId, request_1.default, accounts_1.default.get);
    app.post("/api/accounts", accounts_2.default.create, request_1.default, accounts_1.default.update);
    app.put("/api/accounts/:id", accounts_2.default.hasId, accounts_2.default.create, request_1.default, accounts_1.default.update);
    app.delete("/api/accounts/:id", accounts_2.default.hasId, request_1.default, accounts_1.default.delete);
    app.post("/api/accounts/:id/budget", accounts_2.default.hasId, budgets_1.default.spreadBudget, request_1.default, accountsBudget_1.default.setBudget);
    app.get("/api/accounts/:id/budget", accounts_2.default.hasId, request_1.default, accountsBudget_1.default.getBudget);
};
//# sourceMappingURL=accounts.js.map