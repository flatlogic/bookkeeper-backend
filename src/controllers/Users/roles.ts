import { validate } from "class-validator";
import { Request, Response } from "express";

import Roles from "../../models/Roles";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class RolesController {
  public static async list(req: Request, res: Response) {
    const { orgId } = req.params;
    const repository = await getRepository(Roles);
    const roles = await repository.find({
      where: {
        organization: orgId,
      },
    });

    res.json(roles);
  }

  public static async get(req: Request, res: Response) {
    const { id, orgId } = req.params;
    const repository = await getRepository(Roles);
    const role = await repository.findOne({
      where: {
        id,
        organization: orgId,
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
    const { id, orgId } = req.params;
    const data = req.body;
    const repository = await getRepository(Roles);

    let role;
    if (id) {
      role = await repository.findOne({
        where: {
          id,
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
      role.organization = +orgId;
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

  // public static async updateStatus(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { status } = req.body;
  //   const authUser = req.user as Users;
  //
  //   const repository = await getRepository(Roles);
  //   const resultQuery = repository
  //     .createQueryBuilder()
  //     .from(Roles, "roles")
  //     .update(Roles)
  //     .set({ status })
  //     .where("id = :id", { id });
  //   if (authUser.isAdmin()) {
  //     resultQuery.andWhere("organization = :orgId", {orgId: authUser.getOrganizationId()});
  //   }
  //
  //   const result = await resultQuery
  //     .returning(["id"])
  //     .execute();
  //
  //   if (result.raw.length) {
  //     res.status(204).json();
  //   } else {
  //     res.status(404).json({
  //       errors: {
  //         message: "No Role found",
  //       },
  //     });
  //   }
  // }

  public static async delete(req: Request, res: Response) {
    const { id, orgId } = req.params;

    const repository = await getRepository(Roles);
    const result = await repository
      .createQueryBuilder()
      .update(Roles)
      .where("id = :id AND organization = :orgId", { id, orgId })
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
