import { validate } from "class-validator";
import { Request, Response } from "express";

import Accounts from "../../models/Accounts";
import Budget from "../../models/GeneralLedgerAccountsBudget";
import { getRepository } from "../../services/db";

export default class AccountsBudgetController {
  public static async setBudget(req: Request, res: Response) {
    const { id: accountId } = req.params;
    const { budget } = req.body;
    const accountRepository = await getRepository(Accounts);
    const budgetRepository = await getRepository(Budget);

    const account = await accountRepository.findOne(accountId);
    if (!account) {
      return res.status(400).json({
        errors: {
          message: "Cannot find account",
        },
      });
    }

    const budgetData = {
      period1Budget: budget[0],
      period2Budget: budget[1],
      period3Budget: budget[2],
      period4Budget: budget[3],
      period5Budget: budget[4],
      period6Budget: budget[5],
      period7Budget: budget[6],
      period8Budget: budget[7],
      period9Budget: budget[8],
      period10Budget: budget[9],
      period11Budget: budget[10],
      period12Budget: budget[11],
    };
    let budgetEntity = await budgetRepository.findOne({
      where: {
        account: accountId,
      },
    });
    if (budgetEntity) {
      budgetEntity.set(budgetData);
    } else {
      budgetEntity = new Budget({
        ...budgetData,
        account,
      });
    }

    const errors = await validate(budgetEntity);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors,
      });
    } else {
      await budgetRepository.save(budgetEntity);
      res.json();
    }
  }

  public static async getBudget(req: Request, res: Response) {
    const { id: accountId } = req.params;
    const repository = await getRepository(Budget);
    const budget = await repository.findOne({
      where: {
        account: accountId,
      },
    });
    if (!budget) {
      return res.status(404).json({
        errors: {
          message: "No Budget for the account",
        },
      });
    }

    res.json(budget);
  }
}
