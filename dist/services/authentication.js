"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passportJWT = __importStar(require("passport-jwt"));
const Users_1 = __importDefault(require("../models/Users"));
const db_1 = require("./db");
exports.init = (passport) => {
    exports.initStrategies(passport);
};
exports.initStrategies = (passport) => {
    const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.SECRET,
    };
    passport.use(new JwtStrategy(opts, (jwtPayload, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield db_1.getRepository(Users_1.default);
        const user = yield repository
            .createQueryBuilder("users")
            .addSelect("users.roles")
            .leftJoinAndSelect("users.companyRoles", "uCmpRoles")
            .leftJoinAndSelect("users.organizations", "organizations")
            .leftJoinAndSelect("uCmpRoles.role", "cmpRole")
            .where("users.id = :id AND users.is_deleted = :isDeleted", { isDeleted: false, id: jwtPayload.id })
            .getOne();
        if (user) {
            return callback(null, user);
        }
        else {
            return callback(null, false, { errors: "User not found" });
        }
    })));
};
//# sourceMappingURL=authentication.js.map