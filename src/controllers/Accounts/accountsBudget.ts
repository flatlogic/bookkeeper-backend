import { validate } from "class-validator";
import { Request, Response } from "express";

import Accounts from "../../models/Accounts";
import Budget from "../../models/GeneralLedgerAccountsBudget";
import { getRepository } from "../../services/db";

export default class AccountsBudgetController {
  public static async setBudget(req: Request, res: Response) {
    const { id: accountId } = req.params;
    const { type } = req.query;
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

    let budgetEntity = await budgetRepository.findOne({
      where: {
        account: accountId,
      },
      relations: ["account"],
    });
    if (budgetEntity) {
      budgetEntity.set(budget);
    } else {
      budgetEntity = new Budget({
        ...budget,
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
