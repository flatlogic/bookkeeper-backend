import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";

import Organizations from "../../models/Organizations";
import Roles from "../../models/Roles";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class OrganizationsController {
  public static async list(req: Request, res: Response) {
    const { query, sortKey, sortOrder } = req.query;
    const repository = await getRepository(Organizations);
    const authUser = req.user as Users;

    const organizationsQuery = repository
      .createQueryBuilder("organizations")
      .leftJoinAndSelect("organizations.physicalAddress", "physicalAddress")
      .leftJoinAndSelect("organizations.users", "users")
      .where(
        `organizations.is_deleted = :isDeleted ${query ? "AND (name ~* :query OR description ~* :query)" : ""}`,
        { isDeleted: false, query }
      );
    if (authUser.isAdmin()) {
      organizationsQuery.andWhere(
        `organizations.id = :id`,
        { id: authUser.getOrganizationId() },
      );
    }
    if (sortKey && sortOrder) {
      organizationsQuery.orderBy(changeCase.snakeCase(sortKey), sortOrder.toUpperCase());
    }
    const organizations = await organizationsQuery.getMany();

    res.json(organizations);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    if (authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
      return res.status(403).json({
        errors: {
          message: "User doesn't have access to this organization",
        },
      });
    }

    const repository = await getRepository(Organizations);
    const organization = await repository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: ["users", "physicalAddress", "mailingAddress"],
    });
    if (!organization) {
      return res.status(404).json({
        errors: {
          message: "Organization not found",
        },
      });
    }

    res.json(organization);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const authUser = req.user as Users;
    if (id && authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
      return res.status(403).json({
        errors: {
          message: "User doesn't have access to this organization",
        },
      });
    }

    const repository = await getRepository(Organizations);
    let organization;
    if (id) {
      organization = await repository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        relations: ["physicalAddress", "mailingAddress"],
      });
      if (!organization) {
        return res.status(404).json({
          errors: {
            message: "Organization not found",
          },
        });
      }
    } else {
      organization = new Organizations({});
    }
    try {
      await organization.set(data);
    } catch (e) {
      console.error(e);
    }

    const errors = await validate(organization);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const isNew = !organization.id;
        const result = await repository.save(organization);

        // ToDo: Remove roles are done
        if (isNew) {
          const rolesRepository = await getRepository(Roles);
          let roles = await rolesRepository.find({
            where: {
              organization: 11,
            },
          });
          roles = roles.map((item) => ({...item, id: undefined, organization: result.id})) as Roles[];
          await rolesRepository.save(roles);
        }

        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    if (id && authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
      return res.status(403).json({
        errors: {
          message: "User doesn't have access to this organization",
        },
      });
    }

    const repository = await getRepository(Organizations);
    const result = await repository
      .createQueryBuilder()
      .update(Organizations)
      .set({ isDeleted: true })
      .where("id = :id", { id })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "Organization not found",
        },
      });
    }
  }
}
