"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    spread: [
        express_validator_1.body("accountId", "\"accountId\" cannot be empty").exists(),
        express_validator_1.body("budget", "\"budget\" cannot be empty").exists(),
    ],
    get: [
        express_validator_1.query("accountId", "\"accountId\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=budget.js.map