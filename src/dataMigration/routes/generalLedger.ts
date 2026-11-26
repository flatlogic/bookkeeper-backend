import * as express from "express";
import { param } from "express-validator";

import { BASE_ROLES, STATUSES } from "../../constants";
import authentication from "../../middleware/validators/auth";
import Companies from "../../models/Companies";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";
import GeneralLedgerController from "../controllers/generalLedger";
import reqValidator from "../middleware/validators/request";

async function requireSelectedCompany(req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = req.user as Users;
  const company = user.lastCompanySelected;
  const companyId = req.query.companyId;
  if (typeof companyId !== "string" || !/^[1-9]\d*$/.test(companyId)) {
    return res.status(400).json({errors: {message: "A positive integer companyId is required"}});
  }
  if (user.status !== STATUSES.active || !company || company.isDeleted || company.status !== STATUSES.active ||
      companyId !== String(company.id)) {
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

export default (app: express.Application) => {
  const ledger = express.Router();
  ledger.use(authentication([BASE_ROLES.admin, "SUPER_ADMIN"]), requireSelectedCompany);
  ledger.get("/", GeneralLedgerController.list);
  ledger.get("/:fiscalYear", param("fiscalYear").matches(/^[1-9]\d{3}$/), reqValidator, GeneralLedgerController.get);
  ledger.post("/", GeneralLedgerController.update);
  ledger.put("/", GeneralLedgerController.update);
  ledger.use((req, res) => res.sendStatus(404));
  app.use("/migration/general-ledger", ledger);
};
