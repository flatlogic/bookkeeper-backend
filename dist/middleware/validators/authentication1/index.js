"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    login: [
        express_validator_1.body("username", "\"username\" cannot be empty").exists(),
        express_validator_1.body("password", "\"password\" cannot be empty").exists(),
    ],
    setPassword: [
        express_validator_1.query("token", "\"token\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=index.js.map