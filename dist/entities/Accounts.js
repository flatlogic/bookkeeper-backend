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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.RESTRICTIONS = {};
exports.ACCOUNT_TYPES = [
    { name: "asset", value: "Asset" },
    { name: "liability", value: "Liability" },
    { name: "income", value: "Income" },
    { name: "expense", value: "Expense" },
];
let Accounts = class Accounts {
    constructor({ code, status, fiscalYear, description, endYearAdjustmentBudget, restriction, type = 1 } = {}) {
        this.status = 1;
        this.code = code;
        this.status = status;
        this.fiscalYear = fiscalYear;
        this.description = description;
        this.endYearAdjustmentBudget = endYearAdjustmentBudget;
        this.restriction = restriction;
        this.type = type;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Accounts.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Accounts.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Accounts.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: "fiscal_year", nullable: false }),
    __metadata("design:type", Number)
], Accounts.prototype, "fiscalYear", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Accounts.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Accounts.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "end_year_adjustment_budget", nullable: true }),
    __metadata("design:type", Number)
], Accounts.prototype, "endYearAdjustmentBudget", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Accounts.prototype, "restriction", void 0);
Accounts = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["code", "fiscalYear"]),
    __metadata("design:paramtypes", [Object])
], Accounts);
exports.default = Accounts;
//# sourceMappingURL=Accounts.js.map