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
const constants_1 = require("../constants");
const users_1 = __importDefault(require("../controllers/Users/users"));
const auth_1 = __importDefault(require("../middleware/validators/auth"));
const request_1 = __importStar(require("../middleware/validators/request"));
exports.default = (app) => {
    app.all("/api/users/*", auth_1.default([constants_1.BASE_ROLES.admin, constants_1.BASE_ROLES.superUser]));
    app.get("/api/users", users_1.default.list);
    app.get("/api/users/:id", request_1.requestParams.hasId, request_1.default, users_1.default.get);
    app.post("/api/users", users_1.default.update);
    app.put("/api/users/:id", request_1.requestParams.hasId, request_1.default, users_1.default.update);
    app.delete("/api/users/:id", users_1.default.delete);
};
//# sourceMappingURL=users.js.map