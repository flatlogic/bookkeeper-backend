import { Request, Response } from "express";

import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default async function(req: Request, res: Response, next: () => void) {
  const { _username, _token } = req.query;
  if (!_username || !_token) {
    return res.status(400).json({
      errors: {
        message: "User credentials are empty",
      },
    });
  }

  const repository = await getRepository(Users);
  const user = await repository.findOne({
    where: {
      username: _username,
      passport: _token,
    },
    relations: ["organizations"],
  });

  if (!user) {
    return res.status(400).json({
      errors: {
        message: "User credentials are wrong",
      },
    });
  }

  req.user = user as Users;
  next();
}
