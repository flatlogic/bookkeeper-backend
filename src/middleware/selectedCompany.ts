import { NextFunction, Request, Response } from "express";

import { STATUSES } from "../constants";
import Companies from "../models/Companies";
import Users from "../models/Users";
import { getRepository } from "../services/db";

export default async function requireAssignedCompany(req: Request, res: Response, next: NextFunction) {
  const user = req.user as Users;
  const company = user.lastCompanySelected;
  if (user.status !== STATUSES.active || !company || company.isDeleted || company.status !== STATUSES.active) {
    return res.status(403).json({errors: {message: "No access to this company"}});
  }

  try {
    const companies = await getRepository(Companies);
    const assigned = await companies.createQueryBuilder("company")
      .innerJoin("company.users", "member", "member.id = :userId", {userId: user.id})
      .where("company.id = :companyId", {companyId: company.id})
      .getCount();
    if (!assigned) {
      return res.status(403).json({errors: {message: "No access to this company"}});
    }
    next();
  } catch (error) {
    next(error);
  }
}
