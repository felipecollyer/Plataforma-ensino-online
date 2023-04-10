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
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../Models/Usuario");
const Materias_1 = require("../Models/Materias");
class ControlandoAdm {
    logandoAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Senha } = req.body;
            //Checando dados recebidos
            const EmailRecebido = yield Usuario_1.Usuario.findOne({ Email: Email });
            if (EmailRecebido) {
                //verificar Senha
                if (Senha == EmailRecebido.Senha) {
                    res.status(200).json({ msg: "bem vindo ao admin" });
                }
                else {
                    res.status(200).json({ msg: "Acesso negado" });
                }
            }
            else {
                res.status(200).json({ msg: "Acesso negado" });
            }
        });
    }
    mostrandoUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const UsuariosAguardando = yield Usuario_1.Usuario.find({ Acesso: 'Aguardando' });
            const UsuariosAtivado = yield Usuario_1.Usuario.find({ Acesso: 'Ativado' });
            const TodosUsuarios = yield Usuario_1.Usuario.find();
            const UsuariosPorMateriaFront = yield Usuario_1.Usuario.find({ MateriaEscolhida: 'FrontEnd' });
            const UsuariosPorMateriaBack = yield Usuario_1.Usuario.find({ MateriaEscolhida: 'BackEnd' });
            const MostrarMaterias = yield Materias_1.materias.find();
            return res.json({ TodosUsuarios, UsuariosAtivado, UsuariosAguardando, UsuariosPorMateriaFront, UsuariosPorMateriaBack, MostrarMaterias });
        });
    }
    editandoUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            Materias_1.materias.findOne({ _id: id });
            const UsuariosAguardando = yield Usuario_1.Usuario.findOne({ _id: id });
            if (UsuariosAguardando) {
                UsuariosAguardando.Acesso = 'Ativo';
                yield UsuariosAguardando.save();
                res.json({ msg: 'Usuario com acesso ATIVO.' });
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
        });
    }
}
exports.default = new ControlandoAdm();
