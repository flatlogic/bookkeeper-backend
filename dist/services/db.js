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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.init = () => __awaiter(void 0, void 0, void 0, function* () {
    const host = process.env.PGHOST;
    const database = process.env.PGDATABASE;
    const username = process.env.PGUSER;
    const password = process.env.PGPASSWORD;
    const port = +process.env.PGPORT;
    try {
        return yield typeorm_1.createConnection({
            type: "postgres",
            database,
            host,
            port,
            username,
            password,
            entities: [
                __dirname + "/../models/*"
            ],
            synchronize: true,
        });
    }
    catch (e) {
        console.error("DB connection issue: ", e);
    }
});
exports.getRepository = (model) => __awaiter(void 0, void 0, void 0, function* () {
    return typeorm_1.getManager().getRepository(model);
});
//# sourceMappingURL=db.js.map