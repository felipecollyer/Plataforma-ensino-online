const mongoose = require("mongoose");

const { Schema } = mongoose;

const Materia = mongoose.model(
    "Materias",
    new Schema({
            AreaDeAtuacao: String,
            Conteudos:{
                type:Object,
                Materia:[
                    {
                        Titulo:String,
                        Detalhes:String,
                        Desafios:String
                    }
                ]
            }
        })
);

module.exports = Materia;
