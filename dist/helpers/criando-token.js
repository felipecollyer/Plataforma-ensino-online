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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Materias_1 = require("../Models/Materias");
const CriarTokenUsuario = (usuario, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //verificando o acesso do usuario que vem:
    if (usuario.Acesso === 'administrador') {
        //criando token
        const tokenCreate = jsonwebtoken_1.default.sign({
            id: usuario._id,
            acesso: usuario.Acesso
        }, "meuSecret");
        //return token
        res.status(201).json({ msg: 'Administrador logado com sucesso',
            token: tokenCreate,
        });
    }
    else {
        const tokenCreate = jsonwebtoken_1.default.sign({
            id: usuario._id,
            acesso: usuario.Acesso
        }, "meuSecret");
        if (usuario.Acesso !== "Ativo") {
            return res.status(200).json({ msg: "Aguarde aprovacao do seu cadastro!" });
        }
        else {
            try {
                const PegarMateriaDoUsuario = yield usuario.MateriaEscolhida;
                const PegarMateriaDados = yield Materias_1.materias.findOne({ AreaDeAtuacao: PegarMateriaDoUsuario }).select('-_id');
                return res.status(200).json({ PegarMateriaDados, tokenCreate });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        }
    }
});
module.exports = CriarTokenUsuario;
