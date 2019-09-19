import { validate } from "class-validator";
import { Request, Response } from "express";

import GeneralLedger from "../../models/GeneralLedger";
import dataMapper from "../../services/dataMapper";
import { getRepository } from "../../services/db";

export default class GeneralLedgerController {
  public static async get(req: Request, res: Response) {
    const repository = await getRepository(GeneralLedger);
    const generalLedger = await repository.findOne(); // TODO: Get related to current company
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
    // TODO: will be moved to a Service with improved request - model mapper logic
    const allowedFields = [
      "period1Name", "period1Status", "period2Name", "period2Status", "period3Name", "period3Status",
      "period4Name", "period4Status", "period5Name", "period5Status", "period6Name", "period6Status",
      "period7Name", "period7Status", "period8Name", "period8Status", "period9Name", "period9Status",
      "period10Name", "period10Status", "period11Name", "period11Status", "period12Name", "period12Status",
      "currentFiscalYear", "currentBankBalance",
    ];
    const glData = dataMapper.map(data, allowedFields);
    const repository = await getRepository(GeneralLedger);
    let generalLedger = await repository.findOne(); // TODO: Get related to current company

    if (generalLedger) {
      generalLedger.set(glData);
    } else {
      generalLedger = new GeneralLedger(glData);
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
