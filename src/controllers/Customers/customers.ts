import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";
import get from "lodash/get";

import { STATUSES } from "../../constants";
import Customers from "../../models/Customers";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class CustomersController {
  public static async list(req: Request, res: Response) {
    const { query, sortKey = "id", sortOrder = "asc"} = req.query;
    const authUser = req.user as Users;

    const repository = await getRepository(Customers);
    const customers = await repository
      .createQueryBuilder("customers")
      .where(`company = :company
        ${query ? "AND (code ~* :query OR description ~* :query)" : ""}`,
        { query, company: authUser.lastCompanySelected.id }
      )
      .orderBy(`customers.${changeCase.snakeCase(sortKey)}`, sortOrder.toUpperCase())
      .getMany();

    res.json(customers);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const repository = await getRepository(Customers);
    const customer = await repository.findOne({
      where: {
        id,
        company: authUser.lastCompanySelected.id,
      },
      relations: ["defaultAccount", "defaultSubAccount"],
    });
    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "No Customers with provided \"id\"",
        },
      });
    }

    res.json(customer);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const data = req.body;
    const repository = await getRepository(Customers);

    let customer;
    if (id) {
      customer = await repository.findOne({
        where: {
          id,
          company: authUser.lastCompanySelected.id,
        },
        relations: ["company"],
      });
      if (!customer) {
        return res.status(404).json({
          errors: {
            message: "Cannot find customers",
          },
        });
      }
      customer.set(data);
    } else {
      customer = new Customers({...data, company: get(authUser, "lastCompanySelected")});
    }

    const errors = await validate(customer);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(customer);
        return res.json({id: result.id});
      } catch (e) {
        return res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;

    const repository = await getRepository(Customers);
    const result = await repository
      .createQueryBuilder()
      .update(Customers)
      .set({ status: STATUSES.inactive })
      .where("id = :id AND company_id = :company", {
        id,
        company: authUser.lastCompanySelected.id,
      })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Customers with provided \"id\"",
        },
      });
    }
  }

  public static async checkCodeAvailable(req: Request, res: Response) {
    const { value, id } = req.query;
    const authUser = req.user as Users;

    const repository = await getRepository(Customers);
    const query = repository
      .createQueryBuilder("customers")
      .where(
        "lower(code) = :name AND id = :company",
        { name: value.toLowerCase(), company: authUser.lastCompanySelected.id },
      );
    if (id) {
      query.andWhere("id <> :id", {id});
    }
    const customer = await query.getOne();

    if (customer) {
      res.status(400).json({
        errors: {
          message: "Customers is already used",
        },
      });
    } else {
      res.status(200).json();
    }
  }
}
