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
const constants_1 = require("../../constants");
const organizations_1 = __importDefault(require("../../controllers/Organizations/organizations"));
const roles_1 = __importDefault(require("../../controllers/Users/roles"));
const auth_1 = require("../../middleware/validators/auth");
const auth_2 = __importDefault(require("../../middleware/validators/auth"));
const request_1 = __importStar(require("../../middleware/validators/request"));
exports.default = (app) => {
    app.all("/api/admin/organizations/*", auth_2.default([constants_1.BASE_ROLES.superUser, constants_1.BASE_ROLES.admin]));
    app.get("/api/admin/organizations", organizations_1.default.list);
    app.get("/api/admin/organizations/:id", request_1.requestParams.hasId, request_1.default, organizations_1.default.get);
    app.post("/api/admin/organizations", organizations_1.default.update);
    app.put("/api/admin/organizations/:id", request_1.requestParams.hasId, request_1.default, organizations_1.default.update);
    app.delete("/api/admin/organizations/:id", organizations_1.default.delete);
    app.get("/api/admin/organizations/:orgId/roles", auth_1.checkOrg, roles_1.default.list);
    app.get("/api/admin/organizations/:orgId/roles/:id", roles_1.default.get);
    app.post("/api/admin/organizations/:orgId/roles/:id", roles_1.default.update);
    app.put("/api/admin/organizations/:orgId/roles/:id", roles_1.default.update);
    app.delete("/api/admin/organizations/:orgId/roles/:id", roles_1.default.delete);
};
//# sourceMappingURL=organizations.js.map