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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UserCompanyRoles_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const db_1 = require("../services/db");
const Companies_1 = __importDefault(require("./Companies"));
const Roles_1 = __importDefault(require("./Roles"));
const Users_1 = __importDefault(require("./Users"));
let UserCompanyRoles = UserCompanyRoles_1 = class UserCompanyRoles {
    constructor(data) {
        this.set(data);
    }
    set(data = {}) {
        this.role = data.role;
        this.company = data.company;
        this.user = data.user;
    }
    onUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(UserCompanyRoles_1);
            yield repository.delete({
                user: null,
            });
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserCompanyRoles.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.ManyToOne(() => Roles_1.default),
    typeorm_1.JoinColumn({ name: "role_id" }),
    __metadata("design:type", Roles_1.default)
], UserCompanyRoles.prototype, "role", void 0);
__decorate([
    typeorm_1.RelationId((userCompanyRoles) => userCompanyRoles.role),
    __metadata("design:type", Number)
], UserCompanyRoles.prototype, "roleId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.ManyToOne(() => Companies_1.default),
    typeorm_1.JoinColumn({ name: "company_id" }),
    __metadata("design:type", Companies_1.default)
], UserCompanyRoles.prototype, "company", void 0);
__decorate([
    typeorm_1.RelationId((userCompanyRoles) => userCompanyRoles.company),
    __metadata("design:type", Number)
], UserCompanyRoles.prototype, "companyId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.ManyToOne(() => Users_1.default, (user) => user.companyRoles, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "user_id" }),
    __metadata("design:type", Users_1.default)
], UserCompanyRoles.prototype, "user", void 0);
__decorate([
    typeorm_1.RelationId((userCompanyRoles) => userCompanyRoles.user),
    __metadata("design:type", Number)
], UserCompanyRoles.prototype, "userId", void 0);
__decorate([
    typeorm_1.AfterUpdate(),
    typeorm_1.AfterInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserCompanyRoles.prototype, "onUpdated", null);
UserCompanyRoles = UserCompanyRoles_1 = __decorate([
    typeorm_1.Entity({ name: "user_company_roles" }),
    typeorm_1.Unique(["role", "company", "user"]),
    __metadata("design:paramtypes", [Object])
], UserCompanyRoles);
exports.default = UserCompanyRoles;
//# sourceMappingURL=UserCompanyRoles.js.map