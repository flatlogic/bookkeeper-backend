import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";

import { BASE_ROLES } from "../../constants";
import Companies from "../../models/Companies";
import Users from "../../models/Users";
import dataMapper from "../../services/dataMapper";
import { getRepository } from "../../services/db";
import Mailer from "../../services/mailer";

export default class UsersController {
  public static async list(req: Request, res: Response) {
    const authUser = req.user as Users;
    const { company, query, role, sortKey = "id", sortOrder = "asc" } = req.query;
    let { organization } = req.query;
    if (authUser.isAdmin()) {
      organization = authUser.getOrganizationId();
    }

    const repository = await getRepository(Users);
    const usersQuery = repository
      .createQueryBuilder("users")
      .where(
        `(NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted
        ${query ? "AND (first_name ~* :query OR last_name ~* :query OR username ~* :query)" : ""}`,
        { role: BASE_ROLES.superUser, isDeleted: false, query }
      );
    if (company) {
      usersQuery.innerJoin("users.companies", "uCmp", "uCmp.id = :company", { company });
    }
    if (role) {
      if (role === BASE_ROLES.admin) {
        usersQuery.andWhere(":roleAdmin = ANY(roles)", { roleAdmin: role });
      } else {
        usersQuery.innerJoin("users.companyRoles", "uRoles", "uRoles.role_id = :role", {role});
      }
    }
    if (organization) {
      usersQuery.innerJoinAndSelect( // ToDo: two inner joins in SQL. Investigate this issue
        "users.organizations", "uOrg", "uOrg.id = :organization", { organization }
      );
    } else {
        usersQuery.leftJoinAndSelect("users.organizations", "organizations");
    }
    if (sortKey && sortOrder) {
      usersQuery.orderBy(changeCase.snakeCase(`users.${sortKey}`), sortOrder.toUpperCase());
    }

    const users = await usersQuery.getMany();
    res.json(users);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const repository = await getRepository(Users);
    const userQuery = repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.companyRoles", "companyRoles")
      .where(
        "users.id = :id AND (NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted",
        { role: BASE_ROLES.superUser, isDeleted: false, id }
      )
      .addSelect("users.roles");

    if (authUser.isAdmin()) {
      userQuery.innerJoin(
        "users.organizations", "uOrg", "uOrg.id = :organization",
        { organization: authUser.getOrganizationId() }
      );
    }
    const user = await userQuery.getOne();

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
    const authUser = req.user as Users;
    const repository = await getRepository(Users);

    let user;
    let userData = data;

    if (!authUser.roles.includes(BASE_ROLES.admin) && !authUser.roles.includes(BASE_ROLES.superUser)) {
      const allowedFields = ["firstName", "lastName", "email", "phone"];
      userData = dataMapper.map(data, allowedFields);

      if (id && +id !== +authUser.id) {
        return res.status(404).json({
          errors: {
            message: "User doesn't have needed permissions to edit another user",
          },
        });
      }
    }

    if (id) {
      user = await repository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        relations: ["companyRoles", "organizations"],
      });
      if (!user || user.getOrganizationId() !== authUser.getOrganizationId()) {
        return res.status(404).json({
          errors: {
            message: "User not found",
          },
        });
      }
    } else {
      let { organization } = req.query;
      if (authUser.roles.includes("ADMINISTRATOR")) {
        organization = authUser.organizations[0];
      }
      if (!organization) {
        return res.status(404).json({
          errors: {
            message: "User should be assigned to any organization",
          },
        });
      }
      user = new Users({});
      userData = {...userData, organization};
      user.setPasswordToken();
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
    const authUser = req.user as Users;

    const repository = await getRepository(Users);
    const resultQuery = repository
      .createQueryBuilder()
      .update(Users)
      .set({ status })
      .where("id = :id", { id })
      .returning(["id"]);

    const result = await resultQuery.execute();

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

  public static async checkUsernameAvailable(req: Request, res: Response) {
    const { value, id } = req.query;

    if (!value) {
      return res.status(400).json({
        errors: {
          message: "Value cannot be empty",
        },
      });
    }

    const repository = await getRepository(Users);
    const query = repository
      .createQueryBuilder("users")
      .where(
        "(lower(username) = :name OR lower(email) = :name) AND is_deleted = :isDeleted",
        { name: value.toLowerCase(), isDeleted: false },
      );
    if (id) {
      query.andWhere("id <> :id", {id});
    }
    const user = await query.getOne();

    if (user) {
      res.status(400).json({
        errors: {
          message: "Username is already used",
        },
      });
    } else {
      res.status(200).json();
    }
  }

  public static async sendInvitation(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Users);
    const user = await repository.findOne({
      where: {
        id,
      },
      relations: ["organizations"],
    });

    if (!user) {
      res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    try {
      const url = process.env.UI_BASE_URL + process.env.UI_SET_PASSWORD_URL;
      user.setPasswordToken();
      await repository.save(user);

      await Mailer.sendTemplate(
        user.email,
        "CP for Web Invitation",
        "activation",
        {
          ...user,
          link: `${url}?token=${user.passwordToken}`,
          organizationName: user.getOrganization().name,
        },
      );
      res.status(200).json();
    } catch (e) {
      console.error(e);
      res.status(500).json({
        errors: {
          message: "Cannot send email to the User",
        },
      });
    }
  }
}
