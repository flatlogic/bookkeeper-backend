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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../../models/Users"));
const db_1 = require("../../services/db");
class AuthenticationController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const repository = yield db_1.getRepository(Users_1.default);
            const user = yield repository
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
            const result = bcrypt_1.default.compareSync(password, user.password);
            if (!result) {
                return res.status(401).json({
                    errors: {
                        message: "Password not match",
                    },
                });
            }
            user.lastLogin = new Date();
            yield repository.save(user);
            const token = jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.SECRET, { expiresIn: 604800 });
            res.json({
                token: `JWT ${token}`,
                user: Object.assign(Object.assign({}, user), { password: undefined }),
            });
        });
    }
    static setPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, password } = req.query;
            const repository = yield db_1.getRepository(Users_1.default);
            const user = yield repository.findOne({
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
            const errors = yield class_validator_1.validate(user);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const result = yield repository.save(user);
                    res.json({ id: result.id });
                }
                catch (e) {
                    res.status(400).json({ errors: e });
                }
            }
        });
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=index.js.map