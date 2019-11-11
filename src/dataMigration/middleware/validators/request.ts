import { Request, Response } from "express";
import { param, query, validationResult } from "express-validator";

export default function(req: Request, res: Response, next: () => void) {
  const reqValidation = validationResult(req);
  if (!reqValidation.isEmpty()) {
    res.status(400).json({ reqErrors: reqValidation.array() });
    return;
  }

  next();
}

export const requestParams = {
  hasCompany: [
    query("companyId", "\"companyId\" cannot be empty").exists(),
  ],
  hasCode: [
    param("code", "\"code\" cannot be empty").exists(),
  ],
};
