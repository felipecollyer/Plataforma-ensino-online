"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materia = void 0;
const mongoose_1 = require("mongoose");
exports.materia = (0, mongoose_1.model)("Materias", new mongoose_1.Schema({
    AreaDeAtuacao: String,
    Conteudos: {
        type: Object,
        Materia: [
            {
                Titulo: String,
                Detalhes: String,
                Desafios: String
            }
        ]
    }
}));
