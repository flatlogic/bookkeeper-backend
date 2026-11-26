import { validate } from "class-validator";
import { Request, Response } from "express";

import { STATUSES } from "../../constants";
import Accounts from "../../models/Accounts";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";

// Earlier releases allowed links to parent accounts outside the selected company.
async function subAccountsWithParent(companyId: number) {
  const repository = await getRepository(Accounts);
  return repository.createQueryBuilder("accounts")
    .leftJoinAndSelect("accounts.parent", "parent", "parent.company_id = :company AND parent.is_subaccount = false")
    .where("accounts.company_id = :company AND accounts.is_subaccount = true", {company: companyId});
}

export default class SubAccountsController {
  public static async list(req: Request, res: Response) {
    const authUser = req.user as Users;
    const query = await subAccountsWithParent(authUser.lastCompanySelected.id);
    const accounts = await query
      .andWhere("accounts.status = :status", {status: STATUSES.active})
      .getMany();

    res.json(accounts);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const query = await subAccountsWithParent(authUser.lastCompanySelected.id);
    const account = await query.andWhere("accounts.id = :id", {id: Number(id)}).getOne();
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
    const authUser = req.user as Users;
    const company = authUser.lastCompanySelected;
    const data = {...req.body, company, isSubAccount: true};
    const repository = await getRepository(Accounts);

    let account;
    if (id) {
      account = await repository.findOneBy({
        id: Number(id), isSubAccount: true, company: {id: company.id},
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
      account = new Accounts(data);
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
      .where("id = :id AND is_subaccount = :isSubAccount AND company_id = :company", {
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
