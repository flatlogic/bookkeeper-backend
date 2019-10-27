"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const auth_1 = __importDefault(require("../../middleware/validators/auth"));
const companies_1 = __importDefault(require("./companies"));
const dictionaries_1 = __importDefault(require("./dictionaries"));
const organizations_1 = __importDefault(require("./organizations"));
const superUsers_1 = __importDefault(require("./superUsers"));
const users_1 = __importDefault(require("./users"));
exports.default = (app) => {
    app.all("/api/admin/*", auth_1.default([constants_1.BASE_ROLES.superUser, constants_1.BASE_ROLES.admin]));
    organizations_1.default(app);
    superUsers_1.default(app);
    dictionaries_1.default(app);
    companies_1.default(app);
    users_1.default(app);
};
//# sourceMappingURL=index.js.map