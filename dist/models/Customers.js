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
const BaseAddress_1 = __importDefault(require("./Base/BaseAddress"));
let Customers = class Customers extends BaseAddress_1.default {
    // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
    // @IsNotEmpty()
    // @ManyToOne(() => Companies)
    // public company: Companies;
    // TODO: To be continued
    constructor() {
        super();
        this.status = 1;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Customers.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Customers.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Customers.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ name: "contact_person", nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "contactPerson", void 0);
__decorate([
    typeorm_1.Column({ name: "invoice_terms_message", nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "invoiceTermsMessage", void 0);
__decorate([
    typeorm_1.Column({ name: "is_exempt_for_late_fee", nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "isExemptForLateFee", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "current_year_billings", nullable: true }),
    __metadata("design:type", Number)
], Customers.prototype, "currentYearBillings", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 5, scale: 2, name: "last_year_billings", nullable: true }),
    __metadata("design:type", Number)
], Customers.prototype, "lastYearBillings", void 0);
Customers = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], Customers);
exports.default = Customers;
//# sourceMappingURL=Customers.js.map