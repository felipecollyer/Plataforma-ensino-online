const mongoose = require("mongoose");

const { Schema } = mongoose;

const Usuario = mongoose.model(
    "Usuario",
    new Schema({
        SeuNome: String,
        Email: String,
        Celular: Number,
        Senha: String,
        ConfirmaSenha: String,
        PrimeiroContato: String,
        MateriaEscolhida: String,
        Acesso: String,
    })
);

module.exports = Usuario;
