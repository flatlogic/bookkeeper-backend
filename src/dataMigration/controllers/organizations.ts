import { Request, Response } from "express";

import Organizations from "../../models/Organizations";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class OrganizationsController {
  public static async get(req: Request, res: Response) {
   const authUser = req.user as Users;

   const orgRepository = await getRepository(Organizations);
   const organization = await orgRepository
      .createQueryBuilder("org")
      .leftJoinAndSelect("org.companies", "companies")
      .where(
        "org.id = :orgId",
        { orgId: authUser.getOrganizationId() },
      ).getMany();

   res.json({organization});
  }
}
