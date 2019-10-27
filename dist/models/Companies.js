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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const db_1 = require("../services/db");
const Organizations_1 = __importDefault(require("./Organizations"));
const Users_1 = __importDefault(require("./Users"));
let Companies = class Companies {
    constructor(data) {
        this.isDeleted = false;
        this.status = 1;
        this.isMultipleLocalTaxation = false;
        this.set(data);
    }
    set(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code, status, name, address1, address2, city, state, country, zipCode, zipCodeExt, telAreaCode, telPrefix, telNumber, licenseNumber, faxAreaCode, faxPrefix, faxNumber, defaultWithholdingStateCode, defaultWithholdingLocal1Code, defaultWithholdingLocal2Code, isMultipleLocalTaxation, } = data;
            this.code = code;
            this.status = status;
            this.name = name;
            this.address1 = address1;
            this.address2 = address2;
            this.city = city;
            this.state = state;
            this.country = country;
            this.zipCode = zipCode;
            this.zipCodeExt = zipCodeExt;
            this.telAreaCode = telAreaCode;
            this.telPrefix = telPrefix;
            this.telNumber = telNumber;
            this.licenseNumber = licenseNumber;
            this.faxAreaCode = faxAreaCode;
            this.faxPrefix = faxPrefix;
            this.faxNumber = faxNumber;
            this.defaultWithholdingStateCode = defaultWithholdingStateCode;
            this.defaultWithholdingLocal1Code = defaultWithholdingLocal1Code;
            this.defaultWithholdingLocal2Code = defaultWithholdingLocal2Code;
            this.isMultipleLocalTaxation = isMultipleLocalTaxation;
            if (data.organization) {
                yield this.setOrganization(data.organization);
            }
        });
    }
    setOrganization(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(Organizations_1.default);
            const result = yield repository.findOne(id);
            if (result) {
                this.organization = result;
            }
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Companies.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Companies.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Companies.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Companies.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Companies.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "address1", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "address2", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "city", void 0);
__decorate([
    class_validator_1.Length(2, 2),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "country", void 0);
__decorate([
    class_validator_1.Length(5, 5),
    typeorm_1.Column({ name: "zip_code", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "zipCode", void 0);
__decorate([
    class_validator_1.Length(4, 4),
    typeorm_1.Column({ name: "zip_code_ext", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "zipCodeExt", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "tel_area_code", nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "telAreaCode", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "tel_prefix", nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "telPrefix", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber),
    class_validator_1.Length(4, 4),
    typeorm_1.Column({ name: "tel_number", nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "telNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "license_number", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "licenseNumber", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "fax_area_code", nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "faxAreaCode", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "fax_prefix", nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "faxPrefix", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber),
    class_validator_1.Length(4, 4),
    typeorm_1.Column({ name: "fax_number", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "faxNumber", void 0);
__decorate([
    class_validator_1.Length(2, 2),
    typeorm_1.Column({ name: "default_withholding_state_code", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "defaultWithholdingStateCode", void 0);
__decorate([
    typeorm_1.Column({ name: "default_withholding_local1_code", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "defaultWithholdingLocal1Code", void 0);
__decorate([
    typeorm_1.Column({ name: "default_withholding_local2_code", nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "defaultWithholdingLocal2Code", void 0);
__decorate([
    typeorm_1.Column({ name: "is_multiple_local_taxation", nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Companies.prototype, "isMultipleLocalTaxation", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Users_1.default, (user) => user.companies),
    __metadata("design:type", Array)
], Companies.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Organizations_1.default, (organization) => organization.companies),
    typeorm_1.JoinColumn({ name: "organizationId" }),
    __metadata("design:type", Organizations_1.default)
], Companies.prototype, "organization", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Companies.prototype, "organizationId", void 0);
Companies = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["code"]),
    __metadata("design:paramtypes", [Object])
], Companies);
exports.default = Companies;
//# sourceMappingURL=Companies.js.map