import { validate } from "class-validator";
import { Request, Response } from "express";

import { STATUSES } from "../../constants";
import Employees from "../../models/Employees";
import { getRepository } from "../../services/db";

export default class EmployeesController {
  public static async list(req: Request, res: Response) {
    const repository = await getRepository(Employees);
    const employees = await repository.find({
      where: {
        isDeleted: false,
      },
    });

    res.json(employees);
  }

  public static async get(req: Request, res: Response) {
    const { id } = req.params;
    const repository = await getRepository(Employees);
    const employee = await repository.findOne({
      where: {
        id,
      }
    });
    if (!employee) {
      return res.status(404).json({
        errors: {
          message: "Employee not found",
        },
      });
    }

    res.json(employee);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const employeeData = req.body;
    const repository = await getRepository(Employees);

    let employee;
    if (id) {
      employee = await repository.findOne({
        where: {
          id,
        },
      });
      if (!employee) {
        return res.status(404).json({
          errors: {
            message: "Account not found",
          },
        });
      }
      employee.set(employeeData);
    } else {
      employee = new Employees(employeeData);
    }

    const errors = await validate(employee);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(employee);
        res.json({id: result.id});
      } catch (e) {
        res.status(400).json({errors: e});
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const repository = await getRepository(Employees);
    const result = await repository
      .createQueryBuilder()
      .update(Employees)
      .set({ isDeleted: true })
      .where("id = :id", { id })
      .returning(["id"])
      .execute();

    if (result.raw.length) {
      res.status(204).json();
    } else {
      res.status(404).json({
        errors: {
          message: "Employee not found",
        },
      });
    }
  }
}
