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
const Companies_1 = __importDefault(require("../../controllers/Companies"));
const superUsers_1 = __importDefault(require("../../middleware/validators/admin/superUsers/superUsers"));
const request_1 = __importStar(require("../../middleware/validators/request"));
exports.default = (app) => {
    // TODO: add request validators
    app.get("/api/admin/companies", Companies_1.default.list);
    app.get("/api/admin/companies/:id", request_1.requestParams.hasId, request_1.default, Companies_1.default.get);
    app.post("/api/admin/companies", Companies_1.default.update);
    app.put("/api/admin/companies/:id", request_1.requestParams.hasId, request_1.default, Companies_1.default.update);
    app.put("/api/admin/companies/:id/update-status", superUsers_1.default.updateStatus, request_1.default, Companies_1.default.updateStatus);
    app.delete("/api/admin/companies/:id", request_1.requestParams.hasId, request_1.default, Companies_1.default.delete);
};
//# sourceMappingURL=companies.js.map