import changeCase from "change-case";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Not } from "typeorm";

import { STATUSES } from "../../constants";
import auth from "../../middleware/validators/auth";
import Accounts from "../../models/Accounts";
import Users from "../../models/Users";
import { getRepository } from "../../services/db";
import { readSort } from "../../services/sort";

export default class AccountsController {
  public static async list(req: Request, res: Response) {
    const { fiscalYear, query } = req.query;
    const sort = readSort(req, res);
    if (!sort) {
      return;
    }
    const authUser = req.user as Users;

    const repository = await getRepository(Accounts);
    const accounts = await repository
      .createQueryBuilder("accounts")
      .where(
        `fiscal_year = :fiscalYear AND is_subaccount <> :isSubAccount AND company_id = :company
        ${query ? "AND (code ~* :query OR description ~* :query)" : ""}`,
        { fiscalYear, status: STATUSES.active, isSubAccount: true, query, company: authUser.lastCompanySelected.id }
      )
      .orderBy(`accounts.${changeCase.snakeCase(sort.key)}`, sort.direction)
      .getMany();

    res.json(accounts);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const authUser = req.user as Users;
    const repository = await getRepository(Accounts);
    const account = await repository.findOne({
      where: {
        id: Number(id),
        isSubAccount: Not(true),
        company: { id: authUser.lastCompanySelected.id },
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
    const { fiscalYear } = req.query;
    const authUser = req.user as Users;
    const data = {...req.body, company: authUser.lastCompanySelected, isSubAccount: false};
    const repository = await getRepository(Accounts);

    let account;
    if (id) {
      account = await repository.findOne({
        where: {
          id: Number(id),
          isSubAccount: Not(true),
          company: { id: authUser.lastCompanySelected.id },
        },
        relations: { company: true },
      });
      if (!account) {
        return res.status(404).json({
          errors: {
            message: "Cannot find account",
          },
        });
      }
      account.set(data);
    } else {
      account = new Accounts({...data, fiscalYear});
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
      .where("id = :id AND is_subaccount <> :isSubAccount AND company_id = :company", {
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
          message: "No Accounts with provided \"id\"",
        },
      });
    }
  }

  public static async checkCodeAvailable(req: Request, res: Response) {
    const { value, id } = req.query;
    if (typeof value !== "string" || !value) {
      return res.status(400).json({errors: {message: "Provide a value to check"}});
    }
    const authUser = req.user as Users;

    const repository = await getRepository(Accounts);
    const query = repository
      .createQueryBuilder("accounts")
      .where(
        "lower(code) = :name AND company_id = :company",
        { name: value.toLowerCase(), company: authUser.lastCompanySelected.id },
      );
    if (id) {
      query.andWhere("id <> :id", {id});
    }
    const account = await query.getOne();

    if (account) {
      res.status(400).json({
        errors: {
          message: "Account is already used",
        },
      });
    } else {
      res.status(200).json();
    }
  }
}
