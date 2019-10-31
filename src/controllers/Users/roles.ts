import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";

import Roles from "../../models/Roles";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class RolesController {
  public static async list(req: Request, res: Response) {
    const authUser = req.user as Users;

    const { query, sortKey = "id", sortOrder = "asc" } = req.query;
    const repository = await getRepository(Roles);
    const rolesQuery = repository
      .createQueryBuilder("roles")
      .where(
        `roles.organizationId = :orgId
        ${query ? "AND (name ~* :query OR description ~* :query)" : ""}`,
        { orgId: authUser.getOrganizationId(), query }
      );
    if (sortKey && sortOrder) {
      rolesQuery.orderBy(changeCase.snakeCase(`roles.${sortKey}`), sortOrder.toUpperCase());
    }
    const roles = await rolesQuery.getMany();

    res.json(roles);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const repository = await getRepository(Roles);
    const role = await repository.findOne({
      where: {
        id,
        organizationId: authUser.getOrganizationId(),
      },
    });
    if (!role) {
      return res.status(404).json({
        errors: {
          message: "Role not found",
        },
      });
    }

    res.json(role);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const data = req.body;
    const repository = await getRepository(Roles);

    let role;
    if (id) {
      role = await repository.findOne({
        where: {
          id,
          organizationId: authUser.getOrganizationId(),
        },
      });
      if (!role) {
        return res.status(404).json({
          errors: {
            message: "Role not found",
          },
        });
      }
    } else {
      role = new Roles({});
      data.organization = +authUser.getOrganizationId();
    }
    await role.set(data);

    const errors = await validate(role);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(role);
        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const authUser = req.user as Users;
    const { id } = req.params;

    const repository = await getRepository(Roles);
    const resultQuery = repository
      .createQueryBuilder()
      .from(Roles, "roles")
      .delete()
      .where("id = :id AND organizationId = :orgId", { id, orgId: authUser.getOrganizationId() });
    const result = await resultQuery
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "Role not found",
        },
      });
    }
  }
}
