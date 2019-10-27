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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const db_1 = require("../services/db");
const Addresses_1 = __importDefault(require("./Addresses"));
const Companies_1 = __importDefault(require("./Companies"));
const Roles_1 = __importDefault(require("./Roles"));
const Users_1 = __importDefault(require("./Users"));
let Organizations = class Organizations {
    constructor(data) {
        this.isDeleted = false;
        this.status = constants_1.STATUSES.active;
        if (data) {
            this.set(data);
        }
    }
    set(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.name = data.name;
            this.description = data.description;
            this.setAddresses(data);
            yield this.setUsers(data.users);
        });
    }
    setAddresses(data = {}) {
        if (data.physicalAddress) {
            this.physicalAddress = this.physicalAddress || new Addresses_1.default({});
            this.physicalAddress.set(data.physicalAddress);
        }
        if (data.mailingAddress) {
            this.mailingAddress = this.mailingAddress || new Addresses_1.default({});
            this.mailingAddress.set(data.mailingAddress);
        }
    }
    setUsers(users) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!users) {
                return;
            }
            const repository = yield db_1.getRepository(Users_1.default);
            this.users = [];
            const groupedUsers = users.reduce((map, user) => {
                const userRoleData = Object.assign({}, user);
                if (user.role === constants_1.BASE_ROLES.admin) {
                    userRoleData.organization = this;
                }
                map[user.user] = map[user.user] || [];
                map[user.user].push(user);
                return map;
            }, {});
            yield Promise.all(Object.keys(groupedUsers).map((userId) => __awaiter(this, void 0, void 0, function* () {
                const user = yield repository.findOne({
                    where: {
                        id: userId,
                        isDeleted: false,
                    },
                    relations: ["companyRoles"],
                });
                yield user.setRoles(groupedUsers[userId]);
                this.users.push(user);
            })));
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Organizations.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Organizations.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Organizations.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.Column({ default: constants_1.STATUSES.active }),
    __metadata("design:type", Number)
], Organizations.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Users_1.default, (user) => user.organizations, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Organizations.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => Roles_1.default, (role) => role.organization, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Organizations.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany(() => Companies_1.default, (company) => company.organization, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Organizations.prototype, "companies", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    typeorm_1.OneToOne(() => Addresses_1.default, { cascade: true, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Addresses_1.default)
], Organizations.prototype, "physicalAddress", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    typeorm_1.OneToOne(() => Addresses_1.default, { cascade: true, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Addresses_1.default)
], Organizations.prototype, "mailingAddress", void 0);
Organizations = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["name"]),
    __metadata("design:paramtypes", [Object])
], Organizations);
exports.default = Organizations;
//# sourceMappingURL=Organizations.js.map