import { NextFunction, Request, Response } from "express";

import Accounts from "../models/Accounts";
import Users from "../models/Users";
import { getRepository } from "../services/db";

export default async function resolveAccountParent(req: Request, res: Response, next: NextFunction) {
  const value = req.body.parent;
  if (value === undefined || value === null) {
    return next();
  }
  const valueId = typeof value === "object" ? value.id : value;
  const id = typeof valueId === "string" && /^\d+$/.test(valueId) ? Number(valueId) : valueId;
  if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
    return res.status(400).json({errors: {message: "Invalid parent account ID"}});
  }
  try {
    const user = req.user as Users;
    const repository = await getRepository(Accounts);
    const parent = await repository.findOneBy({
      id, isSubAccount: false, company: {id: user.lastCompanySelected.id},
    });
    if (!parent) {
      return res.status(404).json({errors: {message: "Parent account not found"}});
    }
    req.body.parent = parent;
    next();
  } catch (error) {
    next(error);
  }
}
