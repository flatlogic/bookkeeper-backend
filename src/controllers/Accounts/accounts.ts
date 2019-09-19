import { validate } from "class-validator";
import { Request, Response } from "express";
import { Not } from "typeorm";

import { STATUSES } from "../../constants";
import Accounts from "../../models/Accounts";
import { getRepository } from "../../services/db";

export default class AccountsController {
  public static async list(req: Request, res: Response) {
    const { fiscalYear } = req.query;
    const repository = await getRepository(Accounts);
    const accounts = await repository.find({
      where: {
        fiscalYear,
        status: STATUSES.active,
        isSubAccount: Not(true),
      },
    });

    res.json(accounts);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Accounts);
    const account = await repository.findOne({
      where: {
        id,
        isSubAccount: Not(true),
      }
    });
    if (!account) {
      return res.status(404).json({
        errors: {
          message: "No Accounts with provided \"id\"",
        },
      });
    }

    res.json(account);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const accountData = {
      code: data.code,
      description: data.description,
      fiscalYear: data.fiscalYear,
      restriction: data.restriction,
      type: data.type,
      status: data.status,
    };
    const repository = await getRepository(Accounts);

    let account;
    if (id) {
      account = await repository.findOne({
        where: {
          id,
          isSubAccount: Not(true),
        },
      });
      if (!account) {
        return res.status(404).json({
          errors: {
            message: "Cannot find account",
          },
        });
      }
      account.set(accountData);
    } else {
      account = new Accounts(accountData);
    }

    const errors = await validate(account);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(account);
        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    // TODO: check if account doesn't have transactions
    // if (has transactions) {
    //   return error;
    // }

    const repository = await getRepository(Accounts);
    const result = await repository
      .createQueryBuilder()
      .update(Accounts)
      .set({ status: STATUSES.inactive })
      .where("id = :id AND isSubAccount <> :isSubAccount", { id, isSubAccount: true })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Accounts with provided \"id\"",
        },
      });
    }
  }
}
