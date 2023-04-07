import {Schema, model} from "mongoose";

export const materia = model(
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

