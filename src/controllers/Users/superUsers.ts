import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";

import { BASE_ROLES } from "../../constants";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class SuperUsersController {
  public static async list(req: Request, res: Response) {
    const { query, sortKey = "id", sortOrder = "asc"} = req.query;
    const repository = await getRepository(Users);
    const usersQuery = repository
      .createQueryBuilder()
      .where(
        `:role = ANY(roles) AND is_deleted = :isDeleted
        ${query ? "AND (first_name ~* :query OR last_name ~* :query)" : ""}`,
        { role: BASE_ROLES.superUser, isDeleted: false, query }
      );
    if (sortKey && sortOrder) {
      usersQuery.orderBy(changeCase.snakeCase(sortKey), sortOrder.toUpperCase());
    }
    const users = await usersQuery.getMany();

    res.json(users);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder()
      .where("id = :id AND :role = ANY(roles) AND is_deleted = :isDeleted", {
        id,
        role: BASE_ROLES.superUser,
        isDeleted: false,
      })
      .getOne();

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "Super user not found",
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
    if (id) {
      user = await repository
        .createQueryBuilder()
        .where("id = :id AND :role = ANY(roles) AND is_deleted = :isDeleted", {
          id,
          role: BASE_ROLES.superUser,
          isDeleted: false,
        })
        .getOne();
      if (!user) {
        return res.status(404).json({
          errors: {
            message: "Super user not found",
          },
        });
      }
      user.set(data);
    } else {
      user = new Users(data);
      user.setUserRoles([BASE_ROLES.superUser]);
      user.setPassword(data.password);
    }

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
          message: "Super user not found",
        },
      });
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
          message: "Super user not found",
        },
      });
    }
  }
}
