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
const GeneralLedger_1 = __importDefault(require("../../models/GeneralLedger"));
const dataMapper_1 = __importDefault(require("../../services/dataMapper"));
const db_1 = require("../../services/db");
class GeneralLedgerController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield db_1.getRepository(GeneralLedger_1.default);
            const generalLedger = yield repository.findOne(); // TODO: Get related to current company
            if (!generalLedger) {
                return res.status(404).json({
                    errors: {
                        message: "No initialized General Ledger",
                    },
                });
            }
            res.json(generalLedger);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            // TODO: will be moved to a Service with improved request - model mapper logic
            const allowedFields = [
                "period1Name", "period1Status", "period2Name", "period2Status", "period3Name", "period3Status",
                "period4Name", "period4Status", "period5Name", "period5Status", "period6Name", "period6Status",
                "period7Name", "period7Status", "period8Name", "period8Status", "period9Name", "period9Status",
                "period10Name", "period10Status", "period11Name", "period11Status", "period12Name", "period12Status",
                "currentFiscalYear", "currentBankBalance",
            ];
            const glData = dataMapper_1.default.map(data, allowedFields);
            const repository = yield db_1.getRepository(GeneralLedger_1.default);
            let generalLedger = yield repository.findOne(); // TODO: Get related to current company
            if (generalLedger) {
                generalLedger.set(glData);
            }
            else {
                generalLedger = new GeneralLedger_1.default(glData);
            }
            const errors = yield class_validator_1.validate(generalLedger);
            if (errors.length > 0) {
                res.status(400).json({
                    modelErrors: errors
                });
            }
            else {
                try {
                    yield repository.save(generalLedger);
                    res.json();
                }
                catch (e) {
                    res.status(400).json({ errors: e });
                }
            }
        });
    }
}
exports.default = GeneralLedgerController;
//# sourceMappingURL=index.js.map