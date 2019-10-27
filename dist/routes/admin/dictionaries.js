"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionaries_1 = __importDefault(require("../../controllers/Dictionaries"));
exports.default = (app) => {
    app.get("/api/admin/dictionaries/users", Dictionaries_1.default.users);
    app.get("/api/admin/dictionaries/roles", Dictionaries_1.default.roles);
    app.get("/api/admin/dictionaries/companies", Dictionaries_1.default.companies);
    app.get("/api/admin/dictionaries/organizations", Dictionaries_1.default.organizations);
};
//# sourceMappingURL=dictionaries.js.map