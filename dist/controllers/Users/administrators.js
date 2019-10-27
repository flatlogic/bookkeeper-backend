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
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
const Users_1 = __importDefault(require("../../models/Users"));
const db_1 = require("../../services/db");
class AdministratorsController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(Users_1.default);
            const administrators = yield repository
                .createQueryBuilder()
                .where(":role = ANY(roles) AND is_deleted = :isDeleted", { role: constants_1.BASE_ROLES.superUser, isDeleted: false })
                .getMany();
            res.json(administrators);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = yield db_1.getRepository(Users_1.default);
            const administrator = yield repository
                .createQueryBuilder()
                .where("id = :id AND :role = ANY(roles) AND is_deleted = :isDeleted", {
                id,
                role: constants_1.BASE_ROLES.superUser,
                isDeleted: false,
            })
                .getOne();
            if (!administrator) {
                return res.status(404).json({
                    errors: {
                        message: "Administrator not found",
                    },
                });
            }
            res.json(administrator);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const repository = yield db_1.getRepository(Users_1.default);
            let user;
            if (id) {
                user = yield repository
                    .createQueryBuilder()
                    .where("id = :id AND :role = ANY(roles) AND is_deleted = :isDeleted", {
                    id,
                    role: constants_1.BASE_ROLES.superUser,
                    isDeleted: false,
                })
                    .getOne();
                if (!user) {
                    return res.status(404).json({
                        errors: {
                            message: "Super user not found",
                        },
                    });
                }
                user.set(data);
            }
            else {
                user = new Users_1.default(data);
                user.setRoles([constants_1.BASE_ROLES.admin]);
            }
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
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = yield db_1.getRepository(Users_1.default);
            const result = yield repository
                .createQueryBuilder()
                .update(Users_1.default)
                .set({ isDeleted: true })
                .where("id = :id", { id })
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "Super user not found",
                    },
                });
            }
        });
    }
}
exports.default = AdministratorsController;
//# sourceMappingURL=administrators.js.map