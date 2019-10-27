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
const superUsers_1 = __importDefault(require("../../controllers/Users/superUsers"));
const superUsers_2 = __importDefault(require("../../middleware/validators/admin/superUsers/superUsers"));
const auth_1 = __importDefault(require("../../middleware/validators/auth"));
const request_1 = __importStar(require("../../middleware/validators/request"));
exports.default = (app) => {
    app.all("/api/admin/super-users/*", auth_1.default([constants_1.BASE_ROLES.superUser]));
    app.get("/api/admin/super-users", superUsers_1.default.list);
    app.get("/api/admin/super-users/:id", request_1.requestParams.hasId, request_1.default, superUsers_1.default.get);
    app.post("/api/admin/super-users", superUsers_1.default.update);
    app.put("/api/admin/super-users/:id/update-status", superUsers_2.default.updateStatus, request_1.default, superUsers_1.default.updateStatus);
    app.put("/api/admin/super-users/:id", request_1.requestParams.hasId, request_1.default, superUsers_1.default.update);
    app.delete("/api/admin/super-users/:id", superUsers_1.default.delete);
};
//# sourceMappingURL=superUsers.js.map