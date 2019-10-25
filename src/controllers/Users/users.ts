import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";

import { BASE_ROLES } from "../../constants";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class UsersController {
  public static async list(req: Request, res: Response) {
    const { company, organization, query, sortKey = "id", sortOrder = "asc" } = req.query;
    const repository = await getRepository(Users);
    const authUser = req.user as Users;
    const usersQuery = repository
      .createQueryBuilder("users")
      .where(
        `(NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted
        ${query ? "AND (first_name ~* :query OR last_name ~* :query)" : ""}`,
        { role: BASE_ROLES.superUser, isDeleted: false }
      );
    if (sortKey && sortOrder) {
      usersQuery.orderBy(changeCase.snakeCase(`users.${sortKey}`), sortOrder.toUpperCase());
    }
    if (company) {
      usersQuery.innerJoin("users.companies", "uCmp", "uCmp.id = :company", { company });
    }
    if (authUser.isAdmin()) {
      usersQuery.innerJoinAndSelect(
        "users.organizations", "uOrg", "uOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    } else {
      usersQuery.leftJoinAndSelect("users.organizations", "organizations");
    }

    const users = await usersQuery.getMany();
    res.json(users);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.companyRoles", "companyRoles")
      .where(
        "users.id = :id AND (NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted",
        { role: BASE_ROLES.superUser, isDeleted: false, id }
      )
      .addSelect("users.roles")
      .getOne();
    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    res.json(user);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const repository = await getRepository(Users);

    let user;
    let userData = data;
    if (id) {
      user = await repository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        relations: ["companyRoles"],
      });
      if (!user) {
        return res.status(404).json({
          errors: {
            message: "User not found",
          },
        });
      }
    } else {
      let { organization = 1 } = req.query;
      const authUser = req.user as Users;
      if (authUser.roles.includes("ADMINISTRATOR")) {
        organization = authUser.organizations[0];
      }
      // if (!organization) {
      //   return res.status(404).json({
      //     errors: {
      //       message: "User should be assigned to any organization",
      //     },
      //   });
      // }
      user = new Users({});
      userData = {...userData, organization};
      user.setPassword("user");
    }
    await user.set(userData);

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(user);
        res.json({id: result.id});
      } catch (e) {
        console.error(e);
        res.status(400).json({errors: e});
      }
    }
  }

  public static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const repository = await getRepository(Users);
    const result = await repository
      .createQueryBuilder()
      .update(Users)
      .set({ status })
      .where("id = :id", { id })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }
  }

  public static async setRoles(req: Request, res: Response) {
    const { id } = req.params;
    const { roles } = req.body;
    const repository = await getRepository(Users);

    let user;
    user = await repository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: ["companyRoles"],
    });
    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }
    await user.setRoles(roles);

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(user);
        res.json({id: result.id});
      } catch (e) {
        console.error(e);
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const repository = await getRepository(Users);
    const result = await repository
      .createQueryBuilder()
      .update(Users)
      .set({ isDeleted: true })
      .where("id = :id", { id })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }
  }
}
