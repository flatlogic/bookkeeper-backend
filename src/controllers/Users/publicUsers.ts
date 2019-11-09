import { validate } from "class-validator";
import { Request, Response } from "express";

import Users from "../../models/Users";
import dataMapper from "../../services/dataMapper";
import { getRepository } from "../../services/db";

export default class PublicUsersController {
  public static async update(req: Request, res: Response) {
    const data = req.body;
    const authUser = req.user as Users;
    const repository = await getRepository(Users);

    const allowedFields = ["firstName", "lastName", "email", "phone"];
    const userData = dataMapper.map(data, allowedFields);

    const user = await repository.findOne({
      where: {
        id: authUser.id,
        isDeleted: false,
      },
      relations: ["companyRoles", "organizations"],
    }) as Users;

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    await user.set(userData);

    if (data.password && data.repeatPassword) {
      if (data.password !== data.repeatPassword) { // @ToDO: user model errors structure
        return res.status(400).json({
          errors: {
            message: "Password should be equal",
          },
        });
      }
      user.setPassword(data.password);
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        const result = await repository.save(user);
        res.json({id: result.id});
      } catch (e) {
        console.error(e);
        res.status(400).json({errors: e});
      }
    }
  }

  public static async selectCompany(req: Request, res: Response) {
    const { company } = req.body;
    const authUser = req.user as Users;

    const repository = await getRepository(Users);
    const user = await repository.findOne(authUser.id);
    await user.setLastCompanySelected(company);

    const errors = await validate(authUser);
    if (errors.length > 0) {
      res.status(400).json({
        modelErrors: errors
      });
    } else {
      try {
        await repository.save(user);
        res.json();
      } catch (e) {
        console.error(e);
        res.status(400).json({errors: e});
      }
    }
  }
}
