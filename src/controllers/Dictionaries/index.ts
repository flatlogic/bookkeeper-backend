import changeCase from "change-case";
import { Request, Response } from "express";

import {BASE_ROLES} from "../../constants";
import Companies from "../../models/Companies";
import Organizations from "../../models/Organizations";
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
        "users.is_deleted = :isDeleted AND (NOT (:role = ANY(roles)) OR roles IS NULL)",
        { isDeleted: false, role: BASE_ROLES.superUser },
      )
      .orderBy(changeCase.snakeCase("first_name"), "ASC");

    if (authUser.isAdmin()) {
      itemsQuery.innerJoinAndSelect(
        "users.organizations", "uOrg", "uOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    } else {
      itemsQuery.leftJoinAndSelect("users.organizations", "uOrg");
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
    const items = await itemsQuery
      .orderBy(changeCase.snakeCase("roles.name"), "ASC")
      .getMany();

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
    const items = await itemsQuery
      .orderBy(changeCase.snakeCase("companies.name"), "ASC")
      .getMany();

    res.json(items);
  }

  public static async organizations(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(Organizations);

    const itemsQuery = repository
      .createQueryBuilder("organizations");

    if (authUser.isAdmin()) {
      itemsQuery.where("id = :id", {id: authUser.getOrganizationId()});
    }
    const items = await itemsQuery
      .orderBy(changeCase.snakeCase("organizations.name"), "ASC")
      .getMany();

    res.json(items);
  }
}
