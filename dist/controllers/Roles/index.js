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
const change_case_1 = __importDefault(require("change-case"));
const Companies_1 = __importDefault(require("../../models/Companies"));
const dataMapper_1 = __importDefault(require("../../services/dataMapper"));
const db_1 = require("../../services/db");
class CompaniesController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query, sortKey = "id", sortOrder = "asc" } = req.query;
            const repository = yield db_1.getRepository(Companies_1.default);
            const authUser = req.user;
            const companiesQuery = repository
                .createQueryBuilder("companies")
                .where(`companies.is_deleted = :isDeleted ${query ? "AND (name ~* :query OR description ~* :query OR code ~* :query)" : ""}`, { isDeleted: false, query });
            if (authUser.isAdmin()) {
                companiesQuery.innerJoinAndSelect("companies.organization", "organization", "organization.id = :organization", { organization: authUser.getOrganizationId() });
            }
            else {
                companiesQuery.leftJoinAndSelect("companies.organization", "organization");
            }
            if (sortKey && sortOrder) {
                companiesQuery.orderBy(`companies.${change_case_1.default.snakeCase(sortKey)}`, sortOrder.toUpperCase());
            }
            const companies = yield companiesQuery.getMany();
            res.json(companies);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authUser = req.user;
            const repository = yield db_1.getRepository(Companies_1.default);
            const companyQuery = repository
                .createQueryBuilder("companies")
                .where("companies.id = :id", { id });
            if (authUser.isAdmin()) {
                companyQuery.innerJoin("companies.organization", "org", "org.id = :org", { org: authUser.getOrganizationId() });
            }
            const company = yield companyQuery.getOne();
            if (!company) {
                return res.status(404).json({
                    errors: {
                        message: "No Company found",
                    },
                });
            }
            res.json(company);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const authUser = req.user;
            const allowedFields = [
                "code", "status", "name", "address1", "address2", "city", "state", "country", "zipCode", "zipCodeExt", "telAreaCode", "telPrefix", "telNumber",
                "licenseNumber", "faxAreaCode", "faxPrefix", "faxNumber", "defaultWithholdingStateCode",
                "defaultWithholdingLocal1Code", "defaultWithholdingLocal2Code", "isMultipleLocalTaxation",
            ];
            const companyData = dataMapper_1.default.map(data, allowedFields);
            const repository = yield db_1.getRepository(Companies_1.default);
            let company;
            if (id) {
                const companyQuery = repository
                    .createQueryBuilder("companies")
                    .where("companies.id = :id", { id });
                if (authUser.isAdmin()) {
                    companyQuery.innerJoin("companies.organization", "org", "org.id = :org", { org: authUser.getOrganizationId() });
                }
                company = yield companyQuery.getOne();
                if (!company) {
                    return res.status(404).json({
                        errors: {
                            message: "Cannot find company",
                        },
                    });
                }
                company.set(companyData);
            }
            else {
                let { organization } = req.query;
                if (authUser.isAdmin()) {
                    organization = authUser.getOrganizationId();
                }
                else {
                    organization = 1;
                }
                if (!organization) {
                    return res.status(404).json({
                        errors: {
                            message: "User should be assigned to any organization",
                        },
                    });
                }
                company = new Companies_1.default({});
                yield company.set(Object.assign(Object.assign({}, companyData), { organization }));
            }
            const errors = yield class_validator_1.validate(company, { skipMissingProperties: true });
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const result = yield repository.save(company);
                    res.json({ id: result.id });
                }
                catch (e) {
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
            const repository = yield db_1.getRepository(Companies_1.default);
            const resultQuery = repository
                .createQueryBuilder()
                .from(Companies_1.default, "companies")
                .update(Companies_1.default)
                .set({ status })
                .where("id = :id", { id });
            if (authUser.isAdmin()) {
                resultQuery.andWhere("organization = :orgId", { orgId: authUser.getOrganizationId() });
            }
            const result = yield resultQuery
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "No Company found",
                    },
                });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authUser = req.user;
            const repository = yield db_1.getRepository(Companies_1.default);
            const resultQuery = repository
                .createQueryBuilder()
                .from(Companies_1.default, "companies")
                .update(Companies_1.default)
                .set({ isDeleted: true })
                .where("id = :id", { id });
            if (authUser.isAdmin()) {
                resultQuery.andWhere("organization = :orgId", { orgId: authUser.getOrganizationId() });
            }
            const result = yield resultQuery
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "No Company found",
                    },
                });
            }
        });
    }
}
exports.default = CompaniesController;
//# sourceMappingURL=index.js.map