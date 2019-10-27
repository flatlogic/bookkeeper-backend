"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    spreadBudget: [
        express_validator_1.body("budget", "\"budget\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=budgets.js.map