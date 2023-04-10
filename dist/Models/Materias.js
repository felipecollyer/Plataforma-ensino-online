"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materias = void 0;
const mongoose_1 = require("mongoose");
const materiaSchema = new mongoose_1.Schema({
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
});
exports.materias = (0, mongoose_1.model)('materias', materiaSchema);
