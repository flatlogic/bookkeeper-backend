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
const superUsers_1 = __importDefault(require("../../controllers/Users/superUsers"));
const request_1 = __importStar(require("../../middleware/validators/request"));
exports.default = (app) => {
    app.get("/api/admin/super-users", superUsers_1.default.list);
    app.get("/api/admin/super-users/:id", request_1.requestParams.hasId, request_1.default, superUsers_1.default.get);
    app.post("/api/admin/super-users", superUsers_1.default.update);
    app.put("/api/admin/super-users/:id", request_1.requestParams.hasId, request_1.default, superUsers_1.default.update);
    app.delete("/api/admin/super-users/:id", superUsers_1.default.delete);
};
//# sourceMappingURL=administrators.js.map