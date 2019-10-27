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
const Accounts_1 = __importDefault(require("../../models/Accounts"));
const GeneralLedgerAccountsBudget_1 = __importDefault(require("../../models/GeneralLedgerAccountsBudget"));
const db_1 = require("../../services/db");
class AccountsBudgetController {
    static setBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: accountId } = req.params;
            const { budget } = req.body;
            const accountRepository = yield db_1.getRepository(Accounts_1.default);
            const budgetRepository = yield db_1.getRepository(GeneralLedgerAccountsBudget_1.default);
            const account = yield accountRepository.findOne(accountId);
            if (!account) {
                return res.status(400).json({
                    errors: {
                        message: "Cannot find account",
                    },
                });
            }
            const budgetData = {
                period1Budget: budget[0],
                period2Budget: budget[1],
                period3Budget: budget[2],
                period4Budget: budget[3],
                period5Budget: budget[4],
                period6Budget: budget[5],
                period7Budget: budget[6],
                period8Budget: budget[7],
                period9Budget: budget[8],
                period10Budget: budget[9],
                period11Budget: budget[10],
                period12Budget: budget[11],
            };
            let budgetEntity = yield budgetRepository.findOne({
                where: {
                    account: accountId,
                },
            });
            if (budgetEntity) {
                budgetEntity.set(budgetData);
            }
            else {
                budgetEntity = new GeneralLedgerAccountsBudget_1.default(Object.assign(Object.assign({}, budgetData), { account }));
            }
            const errors = yield class_validator_1.validate(budgetEntity);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors,
                });
            }
            else {
                yield budgetRepository.save(budgetEntity);
                res.json();
            }
        });
    }
    static getBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: accountId } = req.params;
            const repository = yield db_1.getRepository(GeneralLedgerAccountsBudget_1.default);
            const budget = yield repository.findOne({
                where: {
                    account: accountId,
                },
            });
            if (!budget) {
                return res.status(404).json({
                    errors: {
                        message: "No Budget for the account",
                    },
                });
            }
            res.json(budget);
        });
    }
}
exports.default = AccountsBudgetController;
//# sourceMappingURL=accountsBudget.js.map