import changeCase from "change-case";
import { Request, Response } from "express";

import Companies from "../../models/Companies";
import Roles from "../../models/Roles";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class DictionariesController {
  public static async users(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(Users);
    const itemsQuery = repository
      .createQueryBuilder("users")
      .where(
        "users.is_deleted = :isDeleted",
        { isDeleted: false },
      )
      .orderBy(changeCase.snakeCase("first_name"), "ASC");

    if (authUser.isAdmin()) {
      itemsQuery.innerJoinAndSelect(
        "users.organizations", "uOrg", "uOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    }
    const items = await itemsQuery.getMany();

    res.json(items);
  }

  public static async roles(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(Roles);
    const itemsQuery = repository
      .createQueryBuilder("roles");

    if (authUser.isAdmin()) {
      itemsQuery.innerJoinAndSelect(
        "roles.organization", "rOrg", "rOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    }
    const items = await itemsQuery.getMany();

    res.json(items);
  }

  public static async companies(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(Companies);

    const itemsQuery = repository
      .createQueryBuilder("companies");

    if (authUser.isAdmin()) {
      itemsQuery.innerJoinAndSelect(
        "companies.organization", "cOrg", "cOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    }
    const items = await itemsQuery.getMany();

    res.json(items);
  }
}
