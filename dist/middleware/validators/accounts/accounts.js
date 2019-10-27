"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    create: [
        express_validator_1.body("code", "\"code\" cannot be empty").exists(),
        express_validator_1.body("description", "\"description\" cannot be empty").exists(),
        express_validator_1.body("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
        express_validator_1.body("type", "\"type\" cannot be empty").exists(),
        express_validator_1.body("status", "\"status\" cannot be empty").exists(),
    ],
    hasId: [
        express_validator_1.param("id", "\"id\" cannot be empty").exists(),
    ],
    list: [
        express_validator_1.query("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=accounts.js.map