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
const GLPeriods_1 = __importDefault(require("./GLPeriods"));
let AccountsBudget = class AccountsBudget {
    constructor({ amount, account, period } = {}) {
        this.amount = amount;
        this.account = account;
        this.period = period;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccountsBudget.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], AccountsBudget.prototype, "amount", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Accounts_1.default),
    __metadata("design:type", Accounts_1.default)
], AccountsBudget.prototype, "account", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => GLPeriods_1.default),
    __metadata("design:type", GLPeriods_1.default)
], AccountsBudget.prototype, "period", void 0);
AccountsBudget = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["account", "period"]),
    __metadata("design:paramtypes", [Object])
], AccountsBudget);
exports.default = AccountsBudget;
//# sourceMappingURL=AccountsBudget.js.map