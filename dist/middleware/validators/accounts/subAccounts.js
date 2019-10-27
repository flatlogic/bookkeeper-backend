"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    create: [
        express_validator_1.body("code", "\"code\" cannot be empty").exists(),
        express_validator_1.body("description", "\"description\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=subAccounts.js.map