import bcrypt from "bcrypt";
import { validate } from "class-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default class AuthenticationController {
  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .addSelect("user.roles")
      .leftJoinAndSelect("user.companyRoles", "companyRoles")
      .leftJoinAndSelect("companyRoles.role", "companyRolesRole")
      .where("username = :username OR email = :username", { username })
      .getOne();

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    const result = bcrypt.compareSync(password, user.password);
    if (!result) {
      return res.status(401).json({
        errors: {
          message: "Password not match",
        },
      });
    }

    user.lastLogin = new Date();
    await repository.save(user);
    const token = jwt.sign({...user}, process.env.SECRET, { expiresIn: 604800 });
    res.json({
      token: `JWT ${token}`,
      user: {
        ...user,
        password: undefined,
      },
    });
  }

  public static async setPassword(req: Request, res: Response) {
    const { token, password } = req.query;
    const repository = await getRepository(Users);
    const user = await repository.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    user.setPassword(password);
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
        res.status(400).json({errors: e});
      }
    }
  }
}
