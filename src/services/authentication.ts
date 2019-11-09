import {PassportStatic} from "passport";
import * as passportJWT from "passport-jwt";

import Users from "../models/Users";
import { getRepository } from "./db";

export const init = (passport: PassportStatic) => {
  initStrategies(passport);
};

export const initStrategies = (passport: PassportStatic) => {
  const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET,
  };
  passport.use(new JwtStrategy(opts, async (jwtPayload, callback) => {
    const repository = await getRepository(Users);
    const user = await repository
      .createQueryBuilder("users")
      .addSelect("users.roles")
      .leftJoinAndSelect("users.companyRoles", "uCmpRoles")
      .leftJoinAndSelect("users.organizations", "organizations")
      .leftJoinAndSelect("users.lastCompanySelected", "lastCompanySelected")
      .leftJoinAndSelect("uCmpRoles.role", "cmpRole")
      .where("users.id = :id AND users.is_deleted = :isDeleted", {isDeleted: false, id: jwtPayload.id})
      .getOne();

    if (user) {
      return callback(null, user);
    } else {
      return callback(null, false, { errors: "User not found" });
    }
  }));
};
