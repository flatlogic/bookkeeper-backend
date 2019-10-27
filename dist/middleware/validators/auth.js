"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../../constants");
function default_1(baseRoles, permissions, rolesCondition = "or", strategy = "jwt", opts = { session: false }) {
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
            if (baseRoles.length && ((rolesCondition === "or" && !baseRoles.some((role) => userRoles.includes(role))) ||
                (rolesCondition === "and" && !baseRoles.every((role) => userRoles.includes(role))))) {
                return res.status(403).json({
                    errors: {
                        message: "User does not have needed permissions",
                    },
                });
            }
            if (permissions) {
                const failedCheck = Object.entries(permissions).some(([permissionKey, permissionValue]) => {
                    const isPassed = !!user.companyRoles.find((item) => {
                        const rolePermissionValue = item.role[constants_1.USER_PERMISSIONS[permissionKey]];
                        return rolePermissionValue && rolePermissionValue.includes(permissionValue);
                    });
                    if (!isPassed) {
                        return true;
                    }
                });
                if (failedCheck) {
                    return res.status(403).json({
                        errors: {
                            message: "User does not have needed permissions",
                        },
                    });
                }
            }
            req.user = user;
            next();
        })(req, res, next);
    };
}
exports.default = default_1;
function checkOrg(req, res, next) {
    const { user } = req;
    const orgId = req.params.orgId || req.query.orgId;
    if (!user.organizations.find((item) => item.id === +orgId)) {
        return res.status(403).json({
            errors: {
                message: "User cannot work with provided organization",
            },
        });
    }
    next();
}
exports.checkOrg = checkOrg;
//# sourceMappingURL=auth.js.map