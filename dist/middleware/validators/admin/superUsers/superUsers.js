"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    updateStatus: [
        express_validator_1.body("status", "\"status\" invalid").exists().isIn([1, 0]),
    ],
};
//# sourceMappingURL=superUsers.js.map