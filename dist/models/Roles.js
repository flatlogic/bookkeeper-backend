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
const Organizations_1 = __importDefault(require("./Organizations"));
let Roles = class Roles {
    constructor(data) {
        this.set(data);
    }
    set(data = {}) {
        this.name = data.name;
        this.description = data.description;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Roles.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Roles.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Roles.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: "p_general_ledger", type: "text", array: true, nullable: true }),
    __metadata("design:type", Array)
], Roles.prototype, "pGeneralLedger", void 0);
__decorate([
    typeorm_1.Column({ name: "p_job_cost", type: "text", array: true, nullable: true }),
    __metadata("design:type", Array)
], Roles.prototype, "pJobCost", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Organizations_1.default, (org) => org.roles, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "organizationId" }),
    __metadata("design:type", Object)
], Roles.prototype, "organization", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Roles.prototype, "organizationId", void 0);
Roles = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["name", "organization"]),
    __metadata("design:paramtypes", [Object])
], Roles);
exports.default = Roles;
//# sourceMappingURL=Roles.js.map