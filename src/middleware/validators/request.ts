import { param, validationResult } from "express-validator";

export default function(req: any, res: any, next: any) {
  const reqValidation = validationResult(req);
  if (!reqValidation.isEmpty()) {
    res.status(400).json({ reqErrors: reqValidation.array() });
    return;
  }

  next();
}

export const requestParams = {
  hasId: [
    param("id", "\"id\" cannot be empty").exists(),
  ],
};
