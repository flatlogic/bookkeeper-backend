import { validate } from "class-validator";
import { Request, Response } from "express";
import { Not } from "typeorm";

import { STATUSES } from "../../constants";
import Accounts from "../../models/Accounts";
import { getRepository } from "../../services/db";
import accountsMapper from "../schemas/accounts";

export default class AccountsController {
  public static async list(req: Request, res: Response) {
    const { companyId } = req.query;

    const repository = await getRepository(Accounts);
    const accounts = await repository
      .createQueryBuilder("accounts")
      .where(
        "is_subaccount <> :isSubAccount AND company_id = :company",
        { isSubAccount: true, company: companyId },
      )
      .getMany();

    res.json(accounts);
  }

  public static async get(req: Request, res: Response) {
    const { code } = req.params;
    const { companyId } = req.query;

    const repository = await getRepository(Accounts);
    const account = await repository.findOne({
      where: {
        code,
        isSubAccount: Not(true),
        company: companyId,
      }
    });
    if (!account) {
      return res.status(404).json({
        errors: {
          message: "No Accounts with provided \"code\"",
        },
      });
    }

    res.json(account);
  }

  public static async update(req: Request, res: Response) {
    const { companyId } = req.query;

    const rawData = req.body;
    const repository = await getRepository(Accounts);

    const savingErrors = [];
    const savingSuccess = [];
    for (const data of rawData) {
      const mappedData = accountsMapper(data);

      let account;
      if (mappedData.code) {
        account = await repository.findOne({
          where: {
            code: mappedData.code,
            isSubAccount: Not(true),
            company: companyId,
          },
          relations: ["company"],
        });
        if (!account) {
          savingErrors.push({
            id: mappedData.code,
            message: "Cannot find account",
          });
          continue;
        }
        account.set(accountsMapper(data));
      } else {
        account = new Accounts(accountsMapper(data));
      }

      const errors = await validate(account);
      if (errors.length > 0) {
        savingErrors.push({
          id: mappedData.code,
          message: errors,
        });
      } else {
        try {
          const result = await repository.save(account);
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

    const repository = await getRepository(Accounts);
    const result = await repository
      .createQueryBuilder()
      .update(Accounts)
      .set({ status: STATUSES.inactive })
      .where("code = :code AND is_subaccount <> :isSubAccount AND company_id = :company", {
        code,
        isSubAccount: true,
        company: companyId,
      })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Accounts with provided \"code\"",
        },
      });
    }
  }
}
