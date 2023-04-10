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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
//credencial pelo env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.set("strictQuery", true);
            yield mongoose_1.default.connect(`mongodb+srv://${dbUser}:${dbPassword}@soudevcluster.vzzpoqr.mongodb.net/?retryWrites=true&w=majority`);
            console.log("conectado ao banco");
        }
        catch (error) {
            console.log(error);
        }
    });
}
module.exports = main;
