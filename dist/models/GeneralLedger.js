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
const constants_1 = require("../constants");
const Accounts_1 = __importDefault(require("./Accounts"));
const Companies_1 = __importDefault(require("./Companies"));
let GeneralLedger = class GeneralLedger {
    constructor(data) {
        this.period1Status = constants_1.STATUSES.active;
        this.period2Status = constants_1.STATUSES.active;
        this.period3Status = constants_1.STATUSES.active;
        this.period4Status = constants_1.STATUSES.active;
        this.period5Status = constants_1.STATUSES.active;
        this.period6Status = constants_1.STATUSES.active;
        this.period7Status = constants_1.STATUSES.active;
        this.period8Status = constants_1.STATUSES.active;
        this.period9Status = constants_1.STATUSES.active;
        this.period10Status = constants_1.STATUSES.active;
        this.period11Status = constants_1.STATUSES.active;
        this.period12Status = constants_1.STATUSES.active;
        this.isPriorFiscalYearClosed = false;
        this.currentBankBalance = 0;
        this.set(data);
    }
    set(data = {}) {
        const { period1Name, period2Name, period3Name, period4Name, period5Name, period6Name, period7Name, period8Name, period9Name, period10Name, period11Name, period12Name, currentFiscalYear, company, } = data;
        this.period1Name = period1Name;
        this.period2Name = period2Name;
        this.period3Name = period3Name;
        this.period4Name = period4Name;
        this.period5Name = period5Name;
        this.period6Name = period6Name;
        this.period7Name = period7Name;
        this.period8Name = period8Name;
        this.period9Name = period9Name;
        this.period10Name = period10Name;
        this.period11Name = period11Name;
        this.period12Name = period12Name;
        this.currentFiscalYear = currentFiscalYear;
        this.company = company;
        if (!this.currentFiscalYearOpenedDate) {
            this.currentFiscalYearOpenedDate = new Date();
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "period_1_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period1Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_1_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period1Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_2_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period2Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_2_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period2Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_3_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period3Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_3_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period3Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_4_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period4Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_4_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period4Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_5_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period5Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_5_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period5Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_6_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period6Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_6_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period6Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_7_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period7Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_7_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period7Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_8_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period8Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_8_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period8Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_9_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period9Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_9_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period9Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_10_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period10Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_10_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period10Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_11_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period11Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_11_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period11Status", void 0);
__decorate([
    typeorm_1.Column({ name: "period_12_name", nullable: false }),
    __metadata("design:type", String)
], GeneralLedger.prototype, "period12Name", void 0);
__decorate([
    typeorm_1.Column({ name: "period_12_status", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "period12Status", void 0);
__decorate([
    typeorm_1.Column({ name: "current_fiscal_year", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "currentFiscalYear", void 0);
__decorate([
    typeorm_1.Column({ name: "is_prior_fiscal_year_closed", nullable: false }),
    __metadata("design:type", Boolean)
], GeneralLedger.prototype, "isPriorFiscalYearClosed", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "current_fiscal_year_opened", nullable: false }),
    __metadata("design:type", Date)
], GeneralLedger.prototype, "currentFiscalYearOpenedDate", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "current_bank_balance", nullable: false }),
    __metadata("design:type", Number)
], GeneralLedger.prototype, "currentBankBalance", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], GeneralLedger.prototype, "retainedEarningsAccount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], GeneralLedger.prototype, "retainedEarningsSubAccount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Companies_1.default),
    __metadata("design:type", Companies_1.default)
], GeneralLedger.prototype, "company", void 0);
GeneralLedger = __decorate([
    typeorm_1.Entity({ name: "general_ledger" }),
    typeorm_1.Unique(["company", "currentFiscalYear"]),
    __metadata("design:paramtypes", [Object])
], GeneralLedger);
exports.default = GeneralLedger;
//# sourceMappingURL=GeneralLedger.js.map