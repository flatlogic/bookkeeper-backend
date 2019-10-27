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
const Roles_1 = __importDefault(require("../../models/Roles"));
const db_1 = require("../../services/db");
class RolesController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orgId } = req.params;
            const repository = yield db_1.getRepository(Roles_1.default);
            const roles = yield repository.find({
                where: {
                    organization: orgId,
                },
            });
            res.json(roles);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, orgId } = req.params;
            const repository = yield db_1.getRepository(Roles_1.default);
            const role = yield repository.findOne({
                where: {
                    id,
                    organization: orgId,
                },
            });
            if (!role) {
                return res.status(404).json({
                    errors: {
                        message: "Role not found",
                    },
                });
            }
            res.json(role);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, orgId } = req.params;
            const data = req.body;
            const repository = yield db_1.getRepository(Roles_1.default);
            let role;
            if (id) {
                role = yield repository.findOne({
                    where: {
                        id,
                    },
                });
                if (!role) {
                    return res.status(404).json({
                        errors: {
                            message: "Role not found",
                        },
                    });
                }
            }
            else {
                role = new Roles_1.default({});
                role.organization = +orgId;
            }
            yield role.set(data);
            const errors = yield class_validator_1.validate(role);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const result = yield repository.save(role);
                    res.json({ id: result.id });
                }
                catch (e) {
                    res.status(400).json({ errors: e });
                }
            }
        });
    }
    // public static async updateStatus(req: Request, res: Response) {
    //   const { id } = req.params;
    //   const { status } = req.body;
    //   const authUser = req.user as Users;
    //
    //   const repository = await getRepository(Roles);
    //   const resultQuery = repository
    //     .createQueryBuilder()
    //     .from(Roles, "roles")
    //     .update(Roles)
    //     .set({ status })
    //     .where("id = :id", { id });
    //   if (authUser.isAdmin()) {
    //     resultQuery.andWhere("organization = :orgId", {orgId: authUser.getOrganizationId()});
    //   }
    //
    //   const result = await resultQuery
    //     .returning(["id"])
    //     .execute();
    //
    //   if (result.raw.length) {
    //     res.status(204).json();
    //   } else {
    //     res.status(404).json({
    //       errors: {
    //         message: "No Role found",
    //       },
    //     });
    //   }
    // }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, orgId } = req.params;
            const repository = yield db_1.getRepository(Roles_1.default);
            const result = yield repository
                .createQueryBuilder()
                .update(Roles_1.default)
                .where("id = :id AND organization = :orgId", { id, orgId })
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "Role not found",
                    },
                });
            }
        });
    }
}
exports.default = RolesController;
//# sourceMappingURL=roles.js.map