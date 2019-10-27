"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralLedger_1 = __importDefault(require("../controllers/GeneralLedger"));
exports.default = (app) => {
    app.get("/api/general-ledger", GeneralLedger_1.default.get);
    app.post("/api/general-ledger", GeneralLedger_1.default.update);
};
//# sourceMappingURL=generalLedger.js.map