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
const constants_1 = require("../../constants");
const Users_1 = __importDefault(require("../../models/Users"));
const db_1 = require("../../services/db");
class UsersController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = req.user;
            const { company, query, role, sortKey = "id", sortOrder = "asc" } = req.query;
            let { organization } = req.query;
            if (authUser.isAdmin()) {
                organization = authUser.getOrganizationId();
            }
            const repository = yield db_1.getRepository(Users_1.default);
            const usersQuery = repository
                .createQueryBuilder("users")
                .where(`(NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted
        ${query ? "AND (first_name ~* :query OR last_name ~* :query)" : ""}`, { role: constants_1.BASE_ROLES.superUser, isDeleted: false, query });
            if (company) {
                usersQuery.innerJoin("users.companies", "uCmp", "uCmp.id = :company", { company });
            }
            if (role) {
                if (role === constants_1.BASE_ROLES.admin) {
                    usersQuery.andWhere(":roleAdmin = ANY(roles)", { roleAdmin: role });
                }
                else {
                    usersQuery.innerJoin("users.companyRoles", "uRoles", "uRoles.role_id = :role", { role });
                }
            }
            if (organization) {
                usersQuery.innerJoinAndSelect(// ToDo: two inner joins in SQL. Investigate this issue
                "users.organizations", "uOrg", "uOrg.id = :organization", { organization });
            }
            else {
                usersQuery.leftJoinAndSelect("users.organizations", "organizations");
            }
            if (sortKey && sortOrder) {
                usersQuery.orderBy(change_case_1.default.snakeCase(`users.${sortKey}`), sortOrder.toUpperCase());
            }
            const users = yield usersQuery.getMany();
            res.json(users);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authUser = req.user;
            const repository = yield db_1.getRepository(Users_1.default);
            const userQuery = repository
                .createQueryBuilder("users")
                .leftJoinAndSelect("users.companyRoles", "companyRoles")
                .where("users.id = :id AND (NOT (:role = ANY(roles)) OR roles IS NULL) AND users.is_deleted = :isDeleted", { role: constants_1.BASE_ROLES.superUser, isDeleted: false, id })
                .addSelect("users.roles");
            if (authUser.isAdmin()) {
                userQuery.innerJoin("users.organizations", "uOrg", "uOrg.id = :organization", { organization: authUser.getOrganizationId() });
            }
            const user = yield userQuery.getOne();
            if (!user) {
                return res.status(404).json({
                    errors: {
                        message: "User not found",
                    },
                });
            }
            res.json(user);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const authUser = req.user;
            const repository = yield db_1.getRepository(Users_1.default);
            let user;
            let userData = data;
            if (id) {
                user = yield repository.findOne({
                    where: {
                        id,
                        isDeleted: false,
                    },
                    relations: ["companyRoles"],
                });
                if (!user || user.getOrganizationId() !== authUser.getOrganizationId()) {
                    return res.status(404).json({
                        errors: {
                            message: "User not found",
                        },
                    });
                }
            }
            else {
                let { organization } = req.query;
                if (authUser.roles.includes("ADMINISTRATOR")) {
                    organization = authUser.organizations[0];
                }
                if (!organization) {
                    return res.status(404).json({
                        errors: {
                            message: "User should be assigned to any organization",
                        },
                    });
                }
                user = new Users_1.default({});
                userData = Object.assign(Object.assign({}, userData), { organization });
                user.setPassword("user");
            }
            yield user.set(userData);
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
                    console.error(e);
                    res.status(400).json({ errors: e });
                }
            }
        });
    }
    static updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            const authUser = req.user;
            const repository = yield db_1.getRepository(Users_1.default);
            const resultQuery = repository
                .createQueryBuilder()
                .update(Users_1.default)
                .set({ status })
                .where("id = :id", { id })
                .returning(["id"]);
            const result = yield resultQuery.execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "User not found",
                    },
                });
            }
        });
    }
    static setRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { roles } = req.body;
            const repository = yield db_1.getRepository(Users_1.default);
            let user;
            user = yield repository.findOne({
                where: {
                    id,
                    isDeleted: false,
                },
                relations: ["companyRoles"],
            });
            if (!user) {
                return res.status(404).json({
                    errors: {
                        message: "User not found",
                    },
                });
            }
            yield user.setRoles(roles);
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
                    console.error(e);
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
                        message: "User not found",
                    },
                });
            }
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.js.map