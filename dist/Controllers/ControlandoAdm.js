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
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../Models/Usuario");
const Materias_1 = require("../Models/Materias");
const pegando_token_1 = __importDefault(require("../helpers/pegando-token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ControlandoAdm {
    mostrandoUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let adminAcessando;
            if (req.headers.authorization) {
                const token = (0, pegando_token_1.default)(req);
                if (token) {
                    const acessandoToken = jsonwebtoken_1.default.verify(token, 'meuSecret');
                    if (acessandoToken.acesso === 'administrador') {
                        try {
                            const adminAcessando = {
                                UsuariosAguardando: yield Usuario_1.Usuario.find({ Acesso: "Aguardando" }).select('-_id'),
                                UsuariosAtivados: yield Usuario_1.Usuario.find({ Acesso: "Ativo" }).select('-_id'),
                                TodosUsuarios: yield Usuario_1.Usuario.find().select('-_id'),
                                MostrarMaterias: yield Materias_1.materias.find()
                            };
                            return res.status(201).json({ adminAcessando });
                        }
                        catch (error) {
                            return res.status(500).json({ msg: error });
                        }
                    }
                    else {
                        return res.status(403).json({ msg: 'Area restrita para adm' });
                    }
                }
            }
            else {
                adminAcessando = null;
                res.send(adminAcessando);
            }
        });
    }
    editandoUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idRecebido = req.params.id;
            try {
                if (idRecebido) {
                    const UsuariosAguardando = yield Usuario_1.Usuario.findOne({ _id: idRecebido });
                    if (UsuariosAguardando) {
                        UsuariosAguardando.Acesso = "Ativo";
                        yield UsuariosAguardando.save();
                        return res.status(201).json({ msg: "Usuario alterado para acesso ATIVO." });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ msg: 'id invalido ou incorreto' });
            }
        });
    }
    criandoMaterias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AreaDeAtuacao, Conteudos } = req.body;
            const criandoMateria = {
                AreaDeAtuacao,
                Conteudos,
            };
            const ArrayRecebidoDeConteudos = criandoMateria.Conteudos.Materia;
            const VerificarCamposDeMaterias = ArrayRecebidoDeConteudos.map((materia, index) => {
                if (!materia.Titulo || !materia.Detalhes || !materia.Desafios) {
                    return index + 1;
                }
                else {
                    return false;
                }
            });
            if (criandoMateria.AreaDeAtuacao) {
                const verificarCamposFalse = VerificarCamposDeMaterias.filter(materia => {
                    if (materia) {
                        return materia;
                    }
                });
                if (verificarCamposFalse.length != 0) {
                    return res.status(400).json({ msg: `Preencha os campos da materia ${verificarCamposFalse} corretamente.` });
                }
                else {
                    try {
                        Materias_1.materias.create(criandoMateria);
                        return res.status(201).json({ msg: 'Materia criada com sucesso' });
                    }
                    catch (error) {
                        return res.status(500).json({ msg: error });
                    }
                }
            }
        });
    }
}
exports.default = new ControlandoAdm();
