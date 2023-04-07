const mongoose = require("mongoose");

const { Schema } = mongoose;

const Materias = mongoose.model(
    "Materias",
    new Schema({
            Materia: String,
            Titulo:String,
            Detalhes:String,
            Desafios:String
        })
);

module.exports = Materias;
