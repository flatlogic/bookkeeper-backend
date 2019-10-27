"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
function default_1(roles, rolesCondition = "or", strategy = "jwt", opts = { session: false }) {
    return (req, res, next) => {
        return passport_1.default.authenticate(strategy, opts, (err, user, info) => {
            if (!user) {
                return res.status(403).json({
                    errors: {
                        message: "User is not authenticated",
                    },
                });
            }
            const userRoles = user.roles || [];
            if ((rolesCondition === "or" && !roles.some((role) => userRoles.includes(role))) ||
                (rolesCondition === "and" && !roles.every((role) => userRoles.includes(role)))) {
                return res.status(403).json({
                    errors: {
                        message: "User does not have needed permissions",
                    },
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
}
exports.default = default_1;
//# sourceMappingURL=authentication.js.map