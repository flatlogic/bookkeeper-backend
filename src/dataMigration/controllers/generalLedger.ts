import { validate } from "class-validator";
import { Request, Response } from "express";

import Accounts from "../../models/Accounts";
import GeneralLedger from "../../models/GeneralLedger";
import { getRepository } from "../../services/db";
import customersMapper from "../schemas/customers";
import glMapper from "../schemas/generalLedger";

export default class GeneralLedgerController {
  public static async list(req: Request, res: Response) {
    const { companyId } = req.query;

    const repository = await getRepository(GeneralLedger);
    const gl = await repository
      .createQueryBuilder("gl")
      .where(
        "company_id = :company",
        { company: companyId },
      )
      .getMany();

    res.json(gl);
  }

  public static async get(req: Request, res: Response) {
    const { fiscalYear } = req.params;
    const { companyId } = req.query;

    const repository = await getRepository(GeneralLedger);
    const account = await repository.findOne({
      where: {
        currentFiscalYear: fiscalYear,
        company: companyId,
      }
    });
    if (!account) {
      return res.status(404).json({
        errors: {
          message: "No GeneralLedger with provided \"currentFiscalYear\"",
        },
      });
    }

    res.json(account);
  }

  public static async update(req: Request, res: Response) {
    const { companyId } = req.query;

    const rawData: Array<{[key: string]: string | number, CurrentFiscalYear: string|number}> = req.body;
    const repository = await getRepository(GeneralLedger);

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
        mappedData = await glMapper(data);
      } catch (e) {
        savingErrors.push({
          id: data.CurrentFiscalYear,
          message: e.message,
        });
        continue;
      }

      let gl;
      if (mappedData.currentFiscalYear) {
        gl = await repository.findOne({
          where: {
            currentFiscalYear: mappedData.currentFiscalYear,
            company: companyId,
          },
          relations: ["company"],
        });
      }

      if (gl) {
        gl.set(mappedData);
      } else {
        gl = new GeneralLedger({ ...mappedData, company: companyId });
      }

      const errors = await validate(gl);
      if (errors.length > 0) {
        savingErrors.push({
          id: mappedData.currentFiscalYear,
          message: errors,
        });
      } else {
        try {
          const result = await repository.save(gl);
          savingSuccess.push({
            id: mappedData.currentFiscalYear,
            entityId: result.id,
          });
        } catch (e) {
          savingErrors.push({
            id: mappedData.currentFiscalYear,
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

  // public static async delete(req: Request, res: Response) {
  //   const { currentFiscalYear } = req.params;
  //   const { companyId } = req.query;
  //
  //   const repository = await getRepository(GeneralLedger);
  //   const result = await repository
  //     .createQueryBuilder()
  //     .update(GeneralLedger)
  //     .where("currentFiscalYear = :currentFiscalYear AND company_id = :company", {
  //       currentFiscalYear,
  //       company: companyId,
  //     })
  //     .returning(["id"])
  //     .execute();
  //
  //   if (result.raw.length) {
  //     res.status(204).json();
  //   } else {
  //     res.status(404).json({
  //       errors: {
  //         message: "No GeneralLedger with provided \"currentFiscalYear\"",
  //       },
  //     });
  //   }
  // }
}
