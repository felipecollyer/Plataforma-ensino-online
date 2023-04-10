"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RotasUsuario_1 = __importDefault(require("./routes/RotasUsuario"));
const RotasAdm_1 = __importDefault(require("./routes/RotasAdm"));
require("dotenv").config();
const conn_1 = __importDefault(require("./db/conn"));
const app = (0, express_1.default)();
//configure json Express
app.use(express_1.default.json());
app.use("/", RotasUsuario_1.default);
app.use("/", RotasAdm_1.default);
app.get("/", (req, res) => {
    return res.status(200).json({ msg: "bem vindo SouDev" });
});
//conectando ao banco
(0, conn_1.default)()
    .then(() => {
    app.listen(3000);
})
    .catch(() => {
    console.log('error ao conectar o banco de dados');
});
