import { validate } from "class-validator";
import { Request, Response } from "express";
import { Not } from "typeorm";

import { Err } from "joi";
import { STATUSES } from "../../constants";
import Customers from "../../models/Customers";
import { getRepository } from "../../services/db";
import customersMapper from "../schemas/customers";

export default class CustomersController {
  public static async list(req: Request, res: Response) {
    const { companyId } = req.query;

    const repository = await getRepository(Customers);
    const customers = await repository
      .createQueryBuilder("customers")
      .where(
        "company_id = :company",
        { company: companyId },
      )
      .getMany();

    res.json(customers);
  }

  public static async get(req: Request, res: Response) {
    const { code } = req.params;
    const { companyId } = req.query;

    const repository = await getRepository(Customers);
    const customer = await repository.findOne({
      where: {
        code,
        company: companyId,
      }
    });
    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "No Customers with provided \"code\"",
        },
      });
    }

    res.json(customer);
  }

  public static async update(req: Request, res: Response) {
    const { companyId } = req.query;

    const rawData: Array<{[key: string]: string | number, CustomerCode: string}> = req.body;
    const repository = await getRepository(Customers);

    if (!Array.isArray(rawData)) {
      return res.status(400).json({
        errors: {
          message: "Payload should be an array",
        },
      });
    }

    const savingErrors = [];
    const savingSuccess = [];
    for (const data of rawData) {
      let mappedData;
      try {
        mappedData = await customersMapper(data);
      } catch (e) {
        savingErrors.push({
          id: data.CustomerCode,
          message: e.message,
        });
        continue;
      }

      let customer;
      if (mappedData.code) {
        customer = await repository.findOne({
          where: {
            code: mappedData.code,
            company: companyId,
          },
          relations: ["company"],
        });
      }

      if (customer) {
        customer.set(mappedData);
      } else {
        customer = new Customers({ ...mappedData, company: companyId });
      }

      const errors = await validate(customer);
      if (errors.length > 0) {
        savingErrors.push({
          id: mappedData.code,
          message: errors,
        });
      } else {
        try {
          const result = await repository.save(customer);
          savingSuccess.push({
            id: mappedData.code,
            entityId: result.id,
          });
        } catch (e) {
          savingErrors.push({
            id: mappedData.code,
            message: e,
          });
        }
      }
    }

    res.json({
      errors: savingErrors,
      success: savingSuccess,
    });
  }

  public static async delete(req: Request, res: Response) {
    const { code } = req.params;
    const { companyId } = req.query;

    const repository = await getRepository(Customers);
    const result = await repository
      .createQueryBuilder()
      .update(Customers)
      .set({ status: STATUSES.inactive })
      .where("code = :code AND company_id = :company", {
        code,
        company: companyId,
      })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Customers with provided \"code\"",
        },
      });
    }
  }
}
