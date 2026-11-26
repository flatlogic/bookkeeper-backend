import { Request, Response } from "express";

import Users from "../../models/Users";
import { getRepository } from "../../services/db";

export default async function(req: Request, res: Response, next: () => void) {
  const { _username, _token } = req.query;
  if (typeof _username !== "string" || !_username || typeof _token !== "string" || !_token) {
    return res.status(400).json({
      errors: {
        message: "User credentials are empty",
      },
    });
  }

  const repository = await getRepository(Users);
  const credentials = {username: _username, passport: _token};
  const legacyTokenColumn = repository.metadata.findColumnWithPropertyName("passport");
  const user = legacyTokenColumn && await repository.findOne({
    where: credentials,
    relations: { organizations: true },
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
