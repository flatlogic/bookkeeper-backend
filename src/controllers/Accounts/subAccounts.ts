import { validate } from "class-validator";
import { Request, Response } from "express";
import get from "lodash/get";

import { STATUSES } from "../../constants";
import Accounts from "../../models/Accounts";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class SubAccountsController {
  public static async list(req: Request, res: Response) {
    const authUser = req.user as Users;
    const repository = await getRepository(Accounts);
    const accounts = await repository
      .createQueryBuilder("accounts")
      .leftJoinAndSelect(
        "accounts.parent",
        "parent",
        // fiscalYear ? "parent.fiscalYear = :fiscalYear" : "",
        // { fiscalYear },
      )
      .where("accounts.status = :status AND accounts.isSubAccount = :isSubAccount AND accounts.company_id = :company", {
        status: STATUSES.active,
        isSubAccount: true,
        company: authUser.lastCompanySelected.id,
      })
      .getMany();

    res.json(accounts);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const repository = await getRepository(Accounts);
    const account = await repository.findOne({
      where: {
        id,
        isSubAccount: true,
        company: authUser.lastCompanySelected.id,
      },
      relations: ["parent"],
    });
    if (!account) {
      return res.status(404).json({
        errors: {
          message: "No Sub Account with provided \"id\"",
        },
      });
    }

    res.json(account);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const authUser = req.user as Users;
    const repository = await getRepository(Accounts);

    let account;
    if (id) {
      account = await repository.findOne({
        where: {
          id,
          isSubAccount: true,
        },
        relations: ["company"],
      });
      if (!account) {
        return res.status(404).json({
          errors: {
            message: "Cannot find Sub Account",
          },
        });
      }
      account.set(data);
    } else {
      account = new Accounts({...data, isSubAccount: true, company: get(authUser, "lastCompanySelected")});
    }

    const errors = await validate(account);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors,
      });
    } else {
      try {
        const result = await repository.save(account);
        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({error: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;

    // TODO: check if account doesn't have transactions
    // if (has transactions) {
    //   return error;
    // }

    const repository = await getRepository(Accounts);
    const result = await repository
      .createQueryBuilder()
      .update(Accounts)
      .set({ status: STATUSES.inactive })
      .where("id = :id AND isSubAccount = :isSubAccount AND company_id = :company", {
        id,
        isSubAccount: true,
        company: authUser.lastCompanySelected.id,
      })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "No Sub Accounts with provided \"id\"",
        },
      });
    }
  }
}
