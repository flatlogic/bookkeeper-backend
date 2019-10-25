import { Request, Response } from "express";
import passport from "passport";

import { USER_PERMISSIONS } from "../../constants";
import User from "../../models/Users";

export default function(
  baseRoles: string[],
  permissions?: {[name: string]: string},
  rolesCondition: "or" | "and" = "or",
  strategy = "jwt",
  opts = { session: false }
) {
  return (req: Request, res: Response, next: () => void) => {
    return passport.authenticate(strategy, opts, (err: any, user: User, info: any) => {
      if (!user) {
        return res.status(403).json({
          errors: {
            message: "User is not authenticated",
          },
        });
      }

      const userRoles = user.roles || [];
      if (
        baseRoles.length && (
          (rolesCondition === "or" && !baseRoles.some((role) => userRoles.includes(role))) ||
          (rolesCondition === "and" && !baseRoles.every((role) => userRoles.includes(role)))
        )
      ) {
        return res.status(403).json({
          errors: {
            message: "User does not have needed permissions",
          },
        });
      }

      if (permissions) {
        const failedCheck = Object.entries(permissions).some(([permissionKey, permissionValue]) => {
          const isPassed = !!user.companyRoles.find((item: any) => {
            const rolePermissionValue = item.role[USER_PERMISSIONS[permissionKey]];
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

      req.user = user as User;
      next();
    })(req, res, next);
  };
}

export function checkOrg(req: Request, res: Response, next: () => void) {
  const { user } = req as any;
  const orgId = req.params.orgId || req.query.orgId;

  if (!user.organizations.find((item: any) => item.id === +orgId)) {
    return res.status(403).json({
      errors: {
        message: "User cannot work with provided organization",
      },
    });
  }

  next();
}
