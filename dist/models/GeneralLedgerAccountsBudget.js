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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Accounts_1 = __importDefault(require("./Accounts"));
const GeneralLedger_1 = __importDefault(require("./GeneralLedger"));
let GeneralLedgerAccountsBudget = class GeneralLedgerAccountsBudget {
    constructor(data) {
        this.period1Budget = 0;
        this.period2Budget = 0;
        this.period3Budget = 0;
        this.period4Budget = 0;
        this.period5Budget = 0;
        this.period6Budget = 0;
        this.period7Budget = 0;
        this.period8Budget = 0;
        this.period9Budget = 0;
        this.period10Budget = 0;
        this.period11Budget = 0;
        this.period12Budget = 0;
        this.set(data);
    }
    set(data = {}) {
        const { period1Budget, period2Budget, period3Budget, period4Budget, period5Budget, period6Budget, period7Budget, period8Budget, period9Budget, period10Budget, period11Budget, period12Budget, account, } = data;
        this.period1Budget = period1Budget;
        this.period2Budget = period2Budget;
        this.period3Budget = period3Budget;
        this.period4Budget = period4Budget;
        this.period5Budget = period5Budget;
        this.period6Budget = period6Budget;
        this.period7Budget = period7Budget;
        this.period8Budget = period8Budget;
        this.period9Budget = period9Budget;
        this.period10Budget = period10Budget;
        this.period11Budget = period11Budget;
        this.period12Budget = period12Budget;
        this.account = account;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_1_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period1Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_2_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period2Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_3_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period3Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_4_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period4Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_5_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period5Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_6_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period6Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_7_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period7Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_8_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period8Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_9_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period9Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_10_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period10Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_11_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period11Budget", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "period_12_budget", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedgerAccountsBudget.prototype, "period12Budget", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], GeneralLedgerAccountsBudget.prototype, "account", void 0);
__decorate([
    typeorm_1.ManyToOne(() => GeneralLedger_1.default),
    __metadata("design:type", GeneralLedger_1.default)
], GeneralLedgerAccountsBudget.prototype, "generalLedger", void 0);
GeneralLedgerAccountsBudget = __decorate([
    typeorm_1.Entity({ name: "general_ledger_accounts_budget" }),
    typeorm_1.Unique(["account", "generalLedger"]),
    __metadata("design:paramtypes", [Object])
], GeneralLedgerAccountsBudget);
exports.default = GeneralLedgerAccountsBudget;
//# sourceMappingURL=GeneralLedgerAccountsBudget.js.map