import bcrypt from "bcrypt";
import { validate } from "class-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Users from "../../models/Users";
import { getRepository } from "../../services/db";
import Mailer from "../../services/mailer";

export default class AuthenticationController {
  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .addSelect("user.roles")
      .leftJoinAndSelect("user.lastCompanySelected", "lastCompanySelected")
      .leftJoinAndSelect("user.companyRoles", "companyRoles")
      .leftJoinAndSelect("companyRoles.role", "companyRolesRole")
      .leftJoinAndSelect("companyRoles.company", "companyRolesCompany")
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

  public static async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .addSelect("user.roles")
      .leftJoinAndSelect("user.lastCompanySelected", "lastCompanySelected")
      .leftJoinAndSelect("user.companyRoles", "companyRoles")
      .leftJoinAndSelect("companyRoles.role", "companyRolesRole")
      .leftJoinAndSelect("companyRoles.company", "companyRolesCompany")
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
    const { token, password, repeatPassword } = req.body;
    const repository = await getRepository(Users);

    if (!token || !password || !repeatPassword) {
      return res.status(400).json({
        errors: {
          message: "Not all required params passed",
        },
      });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({
        errors: {
          message: "Passwords don't match",
        },
      });
    }

    const user = await repository.findOne({
      where: {
        passwordToken: token,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "Set password link is no active longer",
        },
      });
    }

    user.setPassword(password);
    user.passwordToken = null;
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

  public static async resetPassword(req: Request, res: Response) {
    const { username } = req.body;
    const repository = await getRepository(Users);

    const user = await repository
      .createQueryBuilder("user")
      .where("username = :username OR email = :username", { username })
      .getOne();

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    try {
      const url = process.env.UI_BASE_URL + process.env.UI_SET_PASSWORD_URL;
      user.setPasswordToken();
      await repository.save(user);

      await Mailer.sendTemplate(
        user.email,
        "CP for Web. Reset link",
        "resetPassword",
        {
          ...user,
          link: `${url}?token=${user.passwordToken}`,
        },
      );
      res.status(200).json();
    } catch (e) {
      res.status(500).json({
        errors: {
          message: "Cannot send email to the User",
        },
      });
    }
  }
}
