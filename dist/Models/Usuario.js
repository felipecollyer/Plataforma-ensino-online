"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuariosSchema = new mongoose_1.Schema({
    SeuNome: String,
    Email: String,
    Celular: Number,
    Senha: String,
    ConfirmaSenha: String,
    PrimeiroContato: String,
    MateriaEscolhida: String,
    Acesso: String,
});
exports.Usuario = (0, mongoose_1.model)("Usuario", usuariosSchema);
