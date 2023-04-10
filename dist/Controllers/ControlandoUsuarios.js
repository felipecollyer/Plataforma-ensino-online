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
class ControlandoUsuarios {
    criandoCadastro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SeuNome, Email, Celular, Senha, ConfirmaSenha, PrimeiroContato, MateriaEscolhida, } = req.body;
            //respostas do usuario
            const RespostaUsuario = {
                SeuNome,
                Email,
                Celular,
                Senha,
                ConfirmaSenha,
                PrimeiroContato,
                MateriaEscolhida,
                Acesso: "Aguardando"
            };
            //criando administrador
            if (RespostaUsuario.SeuNome == "administrador" && RespostaUsuario.Email == "administrador" && RespostaUsuario.Senha == "administrador") {
                const criarAdministrador = {
                    SeuNome,
                    Email,
                    Senha,
                    Acesso: "administrador"
                };
                const verificarEmail = yield Usuario_1.Usuario.findOne({ email: RespostaUsuario.Email });
                if (verificarEmail) {
                    return res.status(200).json({
                        msg: "Criacao de admin invalida",
                    });
                }
                else {
                    yield Usuario_1.Usuario.create(criarAdministrador);
                    return res.status(200).json({
                        msg: "Administrador criado com sucesso!",
                    });
                }
            }
            //veririfcar campos vazio
            if (!RespostaUsuario.SeuNome ||
                !RespostaUsuario.Email ||
                !RespostaUsuario.Celular ||
                !RespostaUsuario.Senha ||
                !RespostaUsuario.PrimeiroContato ||
                !RespostaUsuario.MateriaEscolhida) {
                return res.status(200).json({
                    msg: "Algum campo esta vazio",
                });
            }
            //verificar se Email ja foi cadastrado
            const verificarEmail = yield Usuario_1.Usuario.findOne({ Email: RespostaUsuario.Email });
            if (verificarEmail) {
                return res.status(200).json({
                    msg: "Email ja cadastrado!",
                });
            }
            //verificar se Celular ja foi cadastrado
            const verificarCelular = yield Usuario_1.Usuario.findOne({ Celular: RespostaUsuario.Celular });
            if (verificarCelular) {
                return res.status(200).json({
                    msg: "Celular ja cadastrado!",
                });
            }
            //conferir senha e confirmSenha
            if (Senha !== ConfirmaSenha) {
                return res.status(200).json({
                    msg: "Senha e ConfirmSenha nao sao iguais",
                });
            }
            //criando Usuario no banco de dados.
            yield Usuario_1.Usuario.create(RespostaUsuario);
            return res.status(200).json({
                msg: "Usuario criado com sucesso! Aguarde a aprovacao do seu cadastro.",
            });
        });
    }
    criandoLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Senha } = req.body;
            const verificarEmail = yield Usuario_1.Usuario.findOne({ Email: Email });
            if (!verificarEmail) {
                return res.json({ msg: "E-mail incorreto!" });
            }
            if (verificarEmail) {
                //checar a senha com email
                if (Senha == verificarEmail.Senha) {
                    if (verificarEmail.Acesso !== "Ativo") {
                        return res.json({ msg: "Aguarde aprovacao do seu cadastro!" });
                    }
                    else {
                        const PegarMateriaDoUsuario = yield verificarEmail.MateriaEscolhida;
                        const PegarMateriaDados = yield Materias_1.materias.findOne({ AreaDeAtuacao: PegarMateriaDoUsuario });
                        return res.json({ PegarMateriaDados });
                    }
                }
                else {
                    return res.json({ msg: "Senha incorreta!" });
                }
            }
            //}
        });
    }
}
exports.default = new ControlandoUsuarios();
