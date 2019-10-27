"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const get_1 = __importDefault(require("lodash/get"));
const uniq_1 = __importDefault(require("lodash/uniq"));
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const db_1 = require("../services/db");
const Companies_1 = __importDefault(require("./Companies"));
const Organizations_1 = __importDefault(require("./Organizations"));
const UserCompanyRoles_1 = __importDefault(require("./UserCompanyRoles"));
let Users = class Users {
    constructor(data) {
        this.isDeleted = false;
        this.status = constants_1.STATUSES.active;
        if (!data) {
            return;
        }
        this.set(data);
    }
    set(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.middleName = data.middleName;
            this.suffix = data.suffix;
            this.email = data.email;
            this.phone = data.phone;
            this.username = data.username;
            this.status = data.status ? 1 : 0;
            if (data.organization) {
                yield this.setOrganization(data.organization);
            }
            if (data.roles) {
                yield this.setRoles(data.roles);
            }
        });
    }
    setUserRoles(roles) {
        this.roles = roles;
    }
    setOrganization(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(Organizations_1.default);
            const result = yield repository.findOne(id);
            if (result) {
                this.organizations = [result];
            }
        });
    }
    setRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(UserCompanyRoles_1.default);
            this.companyRoles = [];
            this.roles = [];
            const promises = roles.map((roleItem) => __awaiter(this, void 0, void 0, function* () {
                if (!roleItem.company && roleItem.role === constants_1.BASE_ROLES.admin) { // set main roles
                    this.roles = [roleItem.role];
                    // this.organizations = [roleItem.organization];
                }
                else if (roleItem.company && roleItem.role) { // set other roles
                    const result = yield repository.findOne({
                        where: {
                            role: roleItem.role,
                            company: roleItem.company,
                            user: this.id,
                        }
                    });
                    if (result) {
                        this.companyRoles.push(result);
                    }
                    else {
                        this.companyRoles.push(new UserCompanyRoles_1.default({
                            role: roleItem.role,
                            company: roleItem.company,
                            user: this.id || this,
                        }));
                    }
                }
                const companiesIds = roles
                    .filter((item) => item.company)
                    .map((item) => +item.company);
                yield this.setCompanies(uniq_1.default(companiesIds));
            }));
            return yield Promise.all(promises);
        });
    }
    setCompanies(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(Companies_1.default);
            if (ids && ids.length) {
                this.companies = yield repository.find({
                    where: {
                        id: typeorm_1.In(ids),
                    },
                });
            }
            else {
                this.companies = [];
            }
        });
    }
    setPassword(password) {
        if (password) {
            const salt = bcrypt_1.default.genSaltSync(10);
            this.password = bcrypt_1.default.hashSync(password, salt);
        }
    }
    isAdmin() {
        return this.roles.includes("ADMINISTRATOR");
    }
    getOrganizationId() {
        return get_1.default(this, "organizations.0.id");
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.Column({ default: constants_1.STATUSES.active }),
    __metadata("design:type", Number)
], Users.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, select: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "first_name", nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "last_name", nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ name: "middle_name", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "middleName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "suffix", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: "text", array: true, nullable: true, select: false }),
    __metadata("design:type", Array)
], Users.prototype, "roles", void 0);
__decorate([
    typeorm_1.Column({ name: "last_login", precision: 6, type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "lastLogin", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Organizations_1.default, (organization) => organization.users),
    typeorm_1.JoinTable({ name: "users_organizations" }),
    __metadata("design:type", Array)
], Users.prototype, "organizations", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Companies_1.default, (company) => company.users),
    typeorm_1.JoinTable({ name: "users_companies" }),
    __metadata("design:type", Array)
], Users.prototype, "companies", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserCompanyRoles_1.default, (companyRole) => companyRole.user, { cascade: true }),
    __metadata("design:type", Array)
], Users.prototype, "companyRoles", void 0);
Users = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["username"]),
    typeorm_1.Unique(["email"]),
    __metadata("design:paramtypes", [Object])
], Users);
exports.default = Users;
//# sourceMappingURL=Users.js.map