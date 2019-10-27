"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = __importDefault(require("../controllers/Authentication"));
const index_1 = __importDefault(require("../middleware/validators/authentication/index"));
const request_1 = __importDefault(require("../middleware/validators/request"));
exports.default = (app) => {
    app.post("/api/login", index_1.default.login, request_1.default, Authentication_1.default.login);
    app.post("/api/set-password", index_1.default.setPassword, request_1.default, Authentication_1.default.setPassword);
};
//# sourceMappingURL=authentication.js.map