"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function default_1(req, res, next) {
    const reqValidation = express_validator_1.validationResult(req);
    if (!reqValidation.isEmpty()) {
        res.status(400).json({ reqErrors: reqValidation.array() });
        return;
    }
    next();
}
exports.default = default_1;
exports.requestParams = {
    hasId: [
        express_validator_1.param("id", "\"id\" cannot be empty").exists(),
    ],
};
//# sourceMappingURL=request.js.map