import { validate } from "class-validator";
import { Request, Response } from "express";

import { STATUSES } from "../../constants";
import Accounts from "../../models/Accounts";
import { getRepository } from "../../services/db";

export default class SubAccountsController {
  public static async list(req: Request, res: Response) {
    const { companyId } = req.query;

    const repository = await getRepository(Accounts);
    const accounts = await repository
      .createQueryBuilder("accounts")
      .where(
        "is_subaccount = :isSubAccount AND company_id = :company",
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
        isSubAccount: true,
        company: companyId,
      }
    });
    if (!account) {
      return res.status(404).json({
        errors: {
          message: "No sub accounts with provided \"code\"",
        },
      });
    }

    res.json(account);
  }

  public static async update(req: Request, res: Response) {
    const { code } = req.params;
    const { fiscalYear, companyId } = req.query;

    const data = req.body;
    const repository = await getRepository(Accounts);

    let account;
    if (code) {
      account = await repository.findOne({
        where: {
          code,
          isSubAccount: true,
          company: companyId,
        },
        relations: ["company"],
      });
      if (!account) {
        return res.status(404).json({
          errors: {
            message: "Cannot find sub account",
          },
        });
      }
      account.set(data);
    } else {
      account = new Accounts({...data, fiscalYear, company: companyId});
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
    const { code } = req.params;
    const { companyId } = req.query;

    const repository = await getRepository(Accounts);
    const result = await repository
      .createQueryBuilder()
      .update(Accounts)
      .set({ status: STATUSES.inactive })
      .where("code = :code AND is_subaccount = :isSubAccount AND company_id = :company", {
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
          message: "No sub accounts with provided \"code\"",
        },
      });
    }
  }
}
