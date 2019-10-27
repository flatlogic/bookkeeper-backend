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
const users_1 = __importDefault(require("../../controllers/Users/users"));
const superUsers_1 = __importDefault(require("../../middleware/validators/admin/superUsers/superUsers"));
const request_1 = __importStar(require("../../middleware/validators/request"));
exports.default = (app) => {
    // app.all( "/api/admin/users/*", authentication([BASE_ROLES.admin, BASE_ROLES.superUser]));
    app.get("/api/admin/users", users_1.default.list);
    app.get("/api/admin/users/:id", request_1.requestParams.hasId, request_1.default, users_1.default.get);
    app.post("/api/admin/users", users_1.default.update);
    app.put("/api/admin/users/:id", request_1.requestParams.hasId, request_1.default, users_1.default.update);
    app.put("/api/admin/users/:id/update-status", superUsers_1.default.updateStatus, request_1.default, users_1.default.updateStatus);
    app.put("/api/admin/users/:id/set-roles", request_1.requestParams.hasId, request_1.default, users_1.default.setRoles);
    app.delete("/api/admin/users/:id", users_1.default.delete);
};
//# sourceMappingURL=users.js.map