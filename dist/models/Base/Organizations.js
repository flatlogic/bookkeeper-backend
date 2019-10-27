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
var Accounts_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
exports.RESTRICTIONS = {
    njt: "Use with NON-JOB Transactions only",
    jet: "Use only for JOB EXPENSE Transactions",
    jit: "Use only for JOB INCOME Transactions",
    et: "Use only for EQUIPMENT Transactions",
    sbt: "Use only for SERVICE/BLNG Transactions",
};
exports.ACCOUNT_TYPES = {
    a: "Asset",
    l: "Liability",
    i: "Income",
    e: "Expense",
};
let Accounts = Accounts_1 = class Accounts {
    // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
    // @IsNotEmpty()
    // @ManyToOne(() => Companies)
    // public company: Companies;
    constructor(data) {
        this.status = 1;
        this.isSubAccount = false;
        this.set(data);
    }
    set(data = {}) {
        const { code, status, fiscalYear, description, endYearAdjustmentBudget, restriction, type, parent, isSubAccount } = data;
        this.code = code;
        this.status = status;
        this.fiscalYear = fiscalYear;
        this.description = description;
        this.endYearAdjustmentBudget = endYearAdjustmentBudget;
        this.restriction = restriction;
        this.type = type;
        this.parent = parent;
        this.isSubAccount = isSubAccount;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Accounts.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Accounts.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Accounts.prototype, "status", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => !o.isSubAccount),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "fiscal_year", nullable: true }),
    __metadata("design:type", Number)
], Accounts.prototype, "fiscalYear", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Accounts.prototype, "description", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => !o.isSubAccount),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.keys(exports.ACCOUNT_TYPES)),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Accounts.prototype, "type", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.restriction !== "undefined"),
    class_validator_1.IsIn([null, ...Object.keys(exports.RESTRICTIONS)]),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Accounts.prototype, "restriction", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "end_year_adjustment_budget", nullable: true }),
    __metadata("design:type", Number)
], Accounts.prototype, "endYearAdjustmentBudget", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Accounts.prototype, "isSubAccount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Accounts_1),
    __metadata("design:type", Accounts)
], Accounts.prototype, "parent", void 0);
Accounts = Accounts_1 = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["code", "fiscalYear"]),
    __metadata("design:paramtypes", [Object])
], Accounts);
exports.default = Accounts;
//# sourceMappingURL=Organizations.js.map