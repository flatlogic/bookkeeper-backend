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
const Companies_1 = __importDefault(require("../../models/Companies"));
const Organizations_1 = __importDefault(require("../../models/Organizations"));
const Roles_1 = __importDefault(require("../../models/Roles"));
const Users_1 = __importDefault(require("../../models/Users"));
const db_1 = require("../../services/db");
class DictionariesController {
    static users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = req.user;
            const repository = yield db_1.getRepository(Users_1.default);
            const itemsQuery = repository
                .createQueryBuilder("users")
                .where("users.is_deleted = :isDeleted", { isDeleted: false })
                .orderBy(change_case_1.default.snakeCase("first_name"), "ASC");
            if (authUser.isAdmin()) {
                itemsQuery.innerJoinAndSelect("users.organizations", "uOrg", "uOrg.id = :organization", { organization: authUser.getOrganizationId() });
            }
            const items = yield itemsQuery.getMany();
            res.json(items);
        });
    }
    static roles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = req.user;
            const repository = yield db_1.getRepository(Roles_1.default);
            const itemsQuery = repository
                .createQueryBuilder("roles");
            if (authUser.isAdmin()) {
                itemsQuery.innerJoinAndSelect("roles.organization", "rOrg", "rOrg.id = :organization", { organization: authUser.getOrganizationId() });
            }
            const items = yield itemsQuery
                .orderBy(change_case_1.default.snakeCase("roles.name"), "ASC")
                .getMany();
            res.json(items);
        });
    }
    static companies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = req.user;
            const repository = yield db_1.getRepository(Companies_1.default);
            const itemsQuery = repository
                .createQueryBuilder("companies");
            if (authUser.isAdmin()) {
                itemsQuery.innerJoinAndSelect("companies.organization", "cOrg", "cOrg.id = :organization", { organization: authUser.getOrganizationId() });
            }
            const items = yield itemsQuery
                .orderBy(change_case_1.default.snakeCase("companies.name"), "ASC")
                .getMany();
            res.json(items);
        });
    }
    static organizations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = req.user;
            const repository = yield db_1.getRepository(Organizations_1.default);
            const itemsQuery = repository
                .createQueryBuilder("organizations");
            if (authUser.isAdmin()) {
                itemsQuery.where("id = :id", { id: authUser.getOrganizationId() });
            }
            const items = yield itemsQuery
                .orderBy(change_case_1.default.snakeCase("organizations.name"), "ASC")
                .getMany();
            res.json(items);
        });
    }
}
exports.default = DictionariesController;
//# sourceMappingURL=index.js.map