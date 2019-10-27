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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Accounts_1 = __importDefault(require("./Accounts"));
const BaseAddress_1 = __importDefault(require("./Base/BaseAddress"));
exports.MINORITY_CODES = {
    black: "Black",
    hispanic: "Hispanic",
    asian: "Asian",
    indian: "Indian",
    hawaiian: "Hawaiian",
    two_more: "2 / more",
};
exports.GENDER_CODES = {
    m: "male",
    f: "female",
};
exports.STATUSES = {
    hourly: "Hourly",
    salary: "Salary",
    inactive: "Inactive",
    deceased: "Deceased",
};
exports.PAYMENT_FREQUENCY = {
    weekly: "Weekly",
    bi_weekly: "Bi-Weekly",
    monthly: "Monthly",
    semi_monthly: "Semi-Monthly",
    daily: "Daily",
};
exports.FEDERAL_WH_TAX_ADJUSTMENT = {
    add_dollar_amount: "Addl $ Amount",
    add_percent_gross: "Addl % of Gross",
    fixed_dollar_amount: "Fixed $ Amount",
    fixed_percent: "Fixed Percent",
    add_percent_tax: "Addl % of Tax",
};
exports.FEDERAL_STATUSES = {
    single: "Single",
    married: "Married",
    head_h_hold: "Head of H/Hold",
    exempt: "Exempt",
};
let Employees = class Employees extends BaseAddress_1.default {
    // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
    // @IsNotEmpty()
    // @ManyToOne(() => Companies)
    // public company: Companies;
    constructor(data = {}) {
        super();
        this.isDeleted = false;
        this.hasPensionPlan = false;
        this.isExcludedCertifiedPayroll = false;
        this.printDetailsCheckStub = false;
        this.isUnionJobOverrideAllowed = false;
        this.isWorkerCompJobOverrideAllowed = false;
        this.isGeneralLiabilityJobOverrideAllowed = false;
        this.set(data);
    }
    set(data = {}) {
        this.code = data.code;
        this.status = data.status;
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.ssn = data.ssn;
        this.minority = data.minority;
        this.gender = data.gender;
        this.hasPensionPlan = data.hasPensionPlan;
        this.birthday = data.birthday;
        this.hireDate = data.hireDate;
        this.terminationDate = data.terminationDate;
        this.rehireDate = data.rehireDate;
        this.otherDate = data.otherDate;
        this.stateWithholdingCode = data.stateWithholdingCode;
        this.paymentFrequency = data.paymentFrequency;
        this.isExcludedCertifiedPayroll = data.isExcludedCertifiedPayroll;
        this.federalWithholdingAllowances = data.federalWithholdingAllowances;
        this.federalWithholdingTaxAdjustment = data.federalWithholdingTaxAdjustment;
        this.federalWithholdingTaxAmount = data.federalWithholdingTaxAmount;
        this.salaryAmount = data.salaryAmount;
        this.printDetailsCheckStub = data.printDetailsCheckStub;
        this.driverLicense = data.driverLicense;
        this.workPermit = data.workPermit;
        this.workPermitExpireDate = data.workPermitExpireDate;
        this.isUnionJobOverrideAllowed = data.isUnionJobOverrideAllowed;
        this.isWorkerCompJobOverrideAllowed = data.isWorkerCompJobOverrideAllowed;
        this.isGeneralLiabilityJobOverrideAllowed = data.isGeneralLiabilityJobOverrideAllowed;
        this.lastCheckDate = data.lastCheckDate;
        this.stateSUIorSDICode = data.stateSUIorSDICode;
        this.department = data.department;
        this.defaultCost = data.defaultCost;
        this.defaultPhase = data.defaultPhase;
        this.defaultJob = data.defaultJob;
        this.unionCode = data.unionCode;
        this.generalLiabilityCode = data.generalLiabilityCode;
        this.workerCompCode = data.workerCompCode;
        this.account = data.account;
        this.subAccount = data.subAccount;
        this.localTaxesCode = data.localTaxesCode;
        this.federalStatus = data.federalStatus;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Employees.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isDeleted", void 0);
__decorate([
    class_validator_1.IsIn(Object.keys(exports.STATUSES)),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "addressLine1", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "addressLine2", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }) // Do we really need to split it on 3 parts?
    ,
    __metadata("design:type", String)
], Employees.prototype, "ssn", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.minority !== "undefined"),
    class_validator_1.IsIn([null, ...Object.keys(exports.MINORITY_CODES)]),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "minority", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.keys(exports.GENDER_CODES)),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ name: "has_pension_plan", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "hasPensionPlan", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Employees.prototype, "birthday", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ type: "date", name: "hire_date", nullable: false }),
    __metadata("design:type", Date)
], Employees.prototype, "hireDate", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "termination_date", nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "terminationDate", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "rehire_date", nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "rehireDate", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "other_date", nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "otherDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "state_withholding_code", nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "stateWithholdingCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "state_sui_sdi_code", nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "stateSUIorSDICode", void 0);
__decorate([
    typeorm_1.Column({ name: "local_taxes_code", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "localTaxesCode", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => (typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
        typeof o.telAreaCode2 !== "undefined")),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "tel_area_code_2", nullable: true }),
    __metadata("design:type", Number)
], Employees.prototype, "telAreaCode2", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => (typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
        typeof o.telAreaCode2 !== "undefined")),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Length(3, 3),
    typeorm_1.Column({ name: "tel_prefix_2", nullable: false }),
    __metadata("design:type", Number)
], Employees.prototype, "telPrefix2", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => (typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
        typeof o.telAreaCode2 !== "undefined")),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Length(4, 4),
    typeorm_1.Column({ name: "tel_number_2", nullable: false }),
    __metadata("design:type", Number)
], Employees.prototype, "telNumber2", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.keys(exports.PAYMENT_FREQUENCY)),
    typeorm_1.Column({ name: "payment_frequency", nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "paymentFrequency", void 0);
__decorate([
    typeorm_1.Column({ name: "is_excluded_certified_payroll", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isExcludedCertifiedPayroll", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.federalWithholdingAllowances !== "undefined"),
    class_validator_1.IsNumber(),
    class_validator_1.Max(99),
    typeorm_1.Column({ name: "federal_withholding_allowances", nullable: true }),
    __metadata("design:type", Number)
], Employees.prototype, "federalWithholdingAllowances", void 0);
__decorate([
    class_validator_1.IsIn(Object.keys(exports.FEDERAL_STATUSES)),
    typeorm_1.Column({ name: "federal_status", nullable: false }),
    __metadata("design:type", String)
], Employees.prototype, "federalStatus", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.federalWithholdingTaxAdjustment !== "undefined"),
    class_validator_1.IsIn([null, ...Object.keys(exports.FEDERAL_WH_TAX_ADJUSTMENT)]),
    typeorm_1.Column({ name: "federal_withholding_tax_adjustment", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "federalWithholdingTaxAdjustment", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "federal_withholding_tax_amount", nullable: true }),
    __metadata("design:type", Number)
], Employees.prototype, "federalWithholdingTaxAmount", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.status === exports.STATUSES.salary),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "salary_amount", nullable: true }),
    __metadata("design:type", Number)
], Employees.prototype, "salaryAmount", void 0);
__decorate([
    typeorm_1.Column({ name: "print_details_check_stub", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "printDetailsCheckStub", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.driverLicense !== "undefined"),
    class_validator_1.Length(15, 15),
    typeorm_1.Column({ name: "driver_license", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "driverLicense", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.workPermit !== "undefined"),
    class_validator_1.Length(12, 12),
    typeorm_1.Column({ name: "work_permit", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "workPermit", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "work_permit_expire_date", nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "workPermitExpireDate", void 0);
__decorate([
    typeorm_1.Column({ name: "is_union_job_override_allowed", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isUnionJobOverrideAllowed", void 0);
__decorate([
    typeorm_1.Column({ name: "is_work_comp_job_override_allowed", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isWorkerCompJobOverrideAllowed", void 0);
__decorate([
    typeorm_1.Column({ name: "is_general_liability_job_override_allowed", nullable: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isGeneralLiabilityJobOverrideAllowed", void 0);
__decorate([
    typeorm_1.Column({ type: "date", name: "last_check_date", nullable: true }) // system field
    ,
    __metadata("design:type", Date)
], Employees.prototype, "lastCheckDate", void 0);
__decorate([
    typeorm_1.Column({ name: "department", nullable: true }) // TODO: should be relation to other table and create on-the-fly
    ,
    __metadata("design:type", String)
], Employees.prototype, "department", void 0);
__decorate([
    typeorm_1.Column({ name: "default_cost", nullable: true }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "defaultCost", void 0);
__decorate([
    typeorm_1.Column({ name: "default_phase", nullable: true }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "defaultPhase", void 0);
__decorate([
    typeorm_1.Column({ name: "default_job", nullable: true }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "defaultJob", void 0);
__decorate([
    typeorm_1.Column({ name: "union_code", nullable: true }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "unionCode", void 0);
__decorate([
    typeorm_1.Column({ name: "general_liability_code", nullable: true }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "generalLiabilityCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "worker_comp_code", nullable: false }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "workerCompCode", void 0);
__decorate([
    class_validator_1.ValidateIf((o) => typeof o.unionCode !== "undefined"),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: "craft_code", nullable: false }) // TODO: should be relation to other table
    ,
    __metadata("design:type", String)
], Employees.prototype, "craftCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.ManyToOne(() => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], Employees.prototype, "account", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], Employees.prototype, "subAccount", void 0);
Employees = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Employees);
exports.default = Employees;
//# sourceMappingURL=Employees.js.map