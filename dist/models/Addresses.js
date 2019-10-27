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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Addresses = class Addresses {
    constructor(data) {
        this.set(data);
    }
    set(data = {}) {
        this.street = data.street;
        this.city = data.city;
        this.state = data.state;
        this.zipCode = data.zipCode;
        this.phone = data.phone;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Addresses.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Addresses.prototype, "street", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Addresses.prototype, "state", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(5, 5),
    typeorm_1.Column({ name: "zip_code", nullable: false }),
    __metadata("design:type", String)
], Addresses.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Addresses.prototype, "phone", void 0);
Addresses = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Addresses);
exports.default = Addresses;
//# sourceMappingURL=Addresses.js.map