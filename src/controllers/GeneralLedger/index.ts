import { validate } from "class-validator";
import { Request, Response } from "express";

import GeneralLedger from "../../models/GeneralLedger";
import Users from "../../models/Users";
import dataMapper from "../../services/dataMapper";
import { getRepository } from "../../services/db";

export default class GeneralLedgerController {
  public static async get(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(GeneralLedger);
    const generalLedger = await repository.findOne({
      where: {
        company: authUser.lastCompanySelected.id,
      },
      relations: ["retainedEarningsAccount", "retainedEarningsSubAccount"],
    });

    if (!generalLedger) {
      return res.status(404).json({
        errors: {
          message: "No initialized General Ledger",
        },
      });
    }

    res.json(generalLedger);
  }

  public static async update(req: Request, res: Response) {
    const data = req.body;
    const authUser = req.user as Users;
    const repository = await getRepository(GeneralLedger);
    let generalLedger = await repository.findOne({
      where: {
        company: authUser.lastCompanySelected.id,
      },
      relations: ["retainedEarningsAccount", "retainedEarningsSubAccount"],
    });

    if (generalLedger) {
      generalLedger.set(data);
    } else {
      generalLedger = new GeneralLedger(
      {
        ...data,
        company: authUser.lastCompanySelected.id,
        currentFiscalYear: 2019,
      }, // @ToDo: Fix Me
      );
    }

    const errors = await validate(generalLedger);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        await repository.save(generalLedger);
        res.json();
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }
}
