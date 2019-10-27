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
class BaseAddress {
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BaseAddress.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ name: "zip_code", nullable: true }),
    __metadata("design:type", String)
], BaseAddress.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.Column({ name: "zip_code_ext", nullable: true }),
    __metadata("design:type", String)
], BaseAddress.prototype, "zipCodeExt", void 0);
__decorate([
    typeorm_1.Column({ name: "tel_area_code", nullable: true }),
    __metadata("design:type", Number)
], BaseAddress.prototype, "telAreaCode", void 0);
__decorate([
    typeorm_1.Column({ name: "tel_prefix", nullable: false }),
    __metadata("design:type", Number)
], BaseAddress.prototype, "telPrefix", void 0);
__decorate([
    typeorm_1.Column({ name: "tel_number", nullable: false }),
    __metadata("design:type", Number)
], BaseAddress.prototype, "telNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "license_number", nullable: true }),
    __metadata("design:type", String)
], BaseAddress.prototype, "licenseNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "fax_area_code", nullable: true }),
    __metadata("design:type", Number)
], BaseAddress.prototype, "faxAreaCode", void 0);
__decorate([
    typeorm_1.Column({ name: "fax_prefix", nullable: true }),
    __metadata("design:type", Number)
], BaseAddress.prototype, "faxPrefix", void 0);
__decorate([
    typeorm_1.Column({ name: "fax_number", nullable: true }),
    __metadata("design:type", String)
], BaseAddress.prototype, "faxNumber", void 0);
exports.default = BaseAddress;
//# sourceMappingURL=BaseAddress.js.map