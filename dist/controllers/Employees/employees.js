"use strict";
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
const Employees_1 = __importDefault(require("../../models/Employees"));
const db_1 = require("../../services/db");
class EmployeesController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(Employees_1.default);
            const employees = yield repository.find({
                where: {
                    isDeleted: false,
                },
            });
            res.json(employees);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = yield db_1.getRepository(Employees_1.default);
            const employee = yield repository.findOne({
                where: {
                    id,
                }
            });
            if (!employee) {
                return res.status(404).json({
                    errors: {
                        message: "Employee not found",
                    },
                });
            }
            res.json(employee);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const employeeData = req.body;
            const repository = yield db_1.getRepository(Employees_1.default);
            let employee;
            if (id) {
                employee = yield repository.findOne({
                    where: {
                        id,
                    },
                });
                if (!employee) {
                    return res.status(404).json({
                        errors: {
                            message: "Account not found",
                        },
                    });
                }
                employee.set(employeeData);
            }
            else {
                employee = new Employees_1.default(employeeData);
            }
            const errors = yield class_validator_1.validate(employee);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const result = yield repository.save(employee);
                    res.json({ id: result.id });
                }
                catch (e) {
                    res.status(400).json({ errors: e });
                }
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = yield db_1.getRepository(Employees_1.default);
            const result = yield repository
                .createQueryBuilder()
                .update(Employees_1.default)
                .set({ isDeleted: true })
                .where("id = :id", { id })
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "Employee not found",
                    },
                });
            }
        });
    }
}
exports.default = EmployeesController;
//# sourceMappingURL=employees.js.map