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
const typeorm_1 = require("typeorm");
const constants_1 = require("../../constants");
const Accounts_1 = __importDefault(require("../../models/Accounts"));
const db_1 = require("../../services/db");
class AccountsController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fiscalYear } = req.query;
            const repository = yield db_1.getRepository(Accounts_1.default);
            const accounts = yield repository.find({
                where: {
                    fiscalYear,
                    status: constants_1.STATUSES.active,
                    isSubAccount: typeorm_1.Not(true),
                },
            });
            res.json(accounts);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = yield db_1.getRepository(Accounts_1.default);
            const account = yield repository.findOne({
                where: {
                    id,
                    isSubAccount: typeorm_1.Not(true),
                }
            });
            if (!account) {
                return res.status(404).json({
                    errors: {
                        message: "No Accounts with provided \"id\"",
                    },
                });
            }
            res.json(account);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const accountData = {
                code: data.code,
                description: data.description,
                fiscalYear: data.fiscalYear,
                restriction: data.restriction,
                type: data.type,
                status: data.status,
            };
            const repository = yield db_1.getRepository(Accounts_1.default);
            let account;
            if (id) {
                account = yield repository.findOne({
                    where: {
                        id,
                        isSubAccount: typeorm_1.Not(true),
                    },
                });
                if (!account) {
                    return res.status(404).json({
                        errors: {
                            message: "Cannot find account",
                        },
                    });
                }
                account.set(accountData);
            }
            else {
                account = new Accounts_1.default(accountData);
            }
            const errors = yield class_validator_1.validate(account);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    const result = yield repository.save(account);
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
            // TODO: check if account doesn't have transactions
            // if (has transactions) {
            //   return error;
            // }
            const repository = yield db_1.getRepository(Accounts_1.default);
            const result = yield repository
                .createQueryBuilder()
                .update(Accounts_1.default)
                .set({ status: constants_1.STATUSES.inactive })
                .where("id = :id AND isSubAccount <> :isSubAccount", { id, isSubAccount: true })
                .returning(["id"])
                .execute();
            if (result.raw.length) {
                res.status(204).json();
            }
            else {
                res.status(404).json({
                    errors: {
                        message: "No Accounts with provided \"id\"",
                    },
                });
            }
        });
    }
}
exports.default = AccountsController;
//# sourceMappingURL=accounts.js.map