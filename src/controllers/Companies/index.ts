import { validate } from "class-validator";
import { Request, Response } from "express";

import { STATUSES } from "../../constants";
import Companies from "../../models/Companies";
import dataMapper from "../../services/dataMapper";
import { getRepository } from "../../services/db";

export default class CompaniesController {
  public static async list(req: Request, res: Response) {
    const repository = await getRepository(Companies);
    const companies = await repository.find({
      where: {
        status: STATUSES.active,
      },
    });

    res.json(companies);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Companies);
    const company = await repository.findOne(id);
    if (!company) {
      return res.status(404).json({
        errors: {
          message: "No Company found",
        },
      });
    }

    res.json(company);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const allowedFields = [
      "code", "status", "name", "address1", "address2", "city", "state", "country", "zipCode", "zipCodeExt", "telAreaCode", "telPrefix", "telNumber",
      "licenseNumber", "faxAreaCode", "faxPrefix", "faxNumber", "defaultWithholdingStateCode",
      "defaultWithholdingLocal1Code", "defaultWithholdingLocal2Code", "isMultipleLocalTaxation",
    ];
    const companyData = dataMapper.map(data, allowedFields);
    const repository = await getRepository(Companies);

    let company;
    if (id) {
      company = await repository.findOne(id);
      if (!company) {
        return res.status(404).json({
          errors: {
            message: "Cannot find company",
          },
        });
      }
      company.set(companyData);
    } else {
      company = new Companies(companyData);
    }

    const errors = await validate(company, { skipMissingProperties: true });
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(company);
        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const repository = await getRepository(Companies);
    const result = await repository
      .createQueryBuilder()
      .update(Companies)
      .set({ status: STATUSES.inactive })
      .where("id = :id", { id})
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Company found",
        },
      });
    }
  }
}
