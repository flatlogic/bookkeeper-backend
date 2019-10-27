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
const change_case_1 = __importDefault(require("change-case"));
const class_validator_1 = require("class-validator");
const Organizations_1 = __importDefault(require("../../models/Organizations"));
const Roles_1 = __importDefault(require("../../models/Roles"));
const db_1 = require("../../services/db");
class OrganizationsController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query, sortKey, sortOrder } = req.query;
            const repository = yield db_1.getRepository(Organizations_1.default);
            const authUser = req.user;
            const organizationsQuery = repository
                .createQueryBuilder("organizations")
                .leftJoinAndSelect("organizations.physicalAddress", "physicalAddress")
                .leftJoinAndSelect("organizations.users", "users")
                .where(`organizations.is_deleted = :isDeleted ${query ? "AND (name ~* :query OR description ~* :query)" : ""}`, { isDeleted: false, query });
            if (authUser.isAdmin()) {
                organizationsQuery.andWhere(`organizations.id = :id`, { id: authUser.getOrganizationId() });
            }
            if (sortKey && sortOrder) {
                organizationsQuery.orderBy(change_case_1.default.snakeCase(sortKey), sortOrder.toUpperCase());
            }
            const organizations = yield organizationsQuery.getMany();
            res.json(organizations);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authUser = req.user;
            if (authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
                return res.status(403).json({
                    errors: {
                        message: "User doesn't have access to this organization",
                    },
                });
            }
            const repository = yield db_1.getRepository(Organizations_1.default);
            const organization = yield repository.findOne({
                where: {
                    id,
                    isDeleted: false,
                },
                relations: ["users", "physicalAddress", "mailingAddress"],
            });
            if (!organization) {
                return res.status(404).json({
                    errors: {
                        message: "Organization not found",
                    },
                });
            }
            res.json(organization);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const authUser = req.user;
            if (id && authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
                return res.status(403).json({
                    errors: {
                        message: "User doesn't have access to this organization",
                    },
                });
            }
            const repository = yield db_1.getRepository(Organizations_1.default);
            let organization;
            if (id) {
                organization = yield repository.findOne({
                    where: {
                        id,
                        isDeleted: false,
                    },
                    relations: ["physicalAddress", "mailingAddress"],
                });
                if (!organization) {
                    return res.status(404).json({
                        errors: {
                            message: "Organization not found",
                        },
                    });
                }
            }
            else {
                organization = new Organizations_1.default({});
            }
            try {
                yield organization.set(data);
            }
            catch (e) {
                console.error(e);
            }
            const errors = yield class_validator_1.validate(organization);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const isNew = !organization.id;
                    const result = yield repository.save(organization);
                    // ToDo: Remove roles are done
                    if (isNew) {
                        const rolesRepository = yield db_1.getRepository(Roles_1.default);
                        let roles = yield rolesRepository.find({
                            where: {
                                organization: 11,
                            },
                        });
                        roles = roles.map((item) => (Object.assign(Object.assign({}, item), { id: undefined, organization: result.id })));
                        yield rolesRepository.save(roles);
                    }
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
            const authUser = req.user;
            if (id && authUser.isAdmin() && +authUser.getOrganizationId() !== +id) {
                return res.status(403).json({
                    errors: {
                        message: "User doesn't have access to this organization",
                    },
                });
            }
            const repository = yield db_1.getRepository(Organizations_1.default);
            const result = yield repository
                .createQueryBuilder()
                .update(Organizations_1.default)
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
                        message: "Organization not found",
                    },
                });
            }
        });
    }
}
exports.default = OrganizationsController;
//# sourceMappingURL=organizations.js.map