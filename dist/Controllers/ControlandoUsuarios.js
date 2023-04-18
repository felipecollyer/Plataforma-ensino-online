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
const bcrypt_1 = __importDefault(require("bcrypt"));
const criando_token_1 = __importDefault(require("../helpers/criando-token"));
class ControlandoUsuarios {
    criandoCadastro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SeuNome, Email, Celular, Senha, ConfirmaSenha, PrimeiroContato, MateriaEscolhida, } = req.body;
            //respostas do usuario
            //criando administrador
            if (SeuNome == "administrador" && Email == "administrador" && Senha == "administrador") {
                const VerificarAdm = Usuario_1.Usuario.findOne({ Email: Email });
                if (!VerificarAdm) {
                    const salt = bcrypt_1.default.genSaltSync(10);
                    const criptografar = bcrypt_1.default.hashSync(Senha, salt);
                    const criarAdministrador = {
                        SeuNome,
                        Email,
                        Senha: criptografar,
                        Acesso: "administrador"
                    };
                    try {
                        yield Usuario_1.Usuario.create(criarAdministrador);
                        return res.status(201).json({ msg: 'Administrador criado com sucesso!' });
                    }
                    catch (error) {
                        res.status(500).json({ msg: error });
                    }
                }
                else {
                    return res.status(401).json({ msg: 'Nao e possivel criar administrador.' });
                }
            }
            //veririfcar campos vazio
            if (!SeuNome ||
                !Email ||
                !Celular ||
                !Senha ||
                !PrimeiroContato ||
                !MateriaEscolhida) {
                return res.status(400).json({
                    msg: "Verifique os campos, e preencha os vazios.",
                });
            }
            //verificar se Email ja foi cadastrado
            try {
                const verificarEmail = yield Usuario_1.Usuario.findOne({ Email: Email });
                if (verificarEmail) {
                    return res.status(422).json({
                        msg: "Email ja cadastrado!",
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    msg: error,
                });
            }
            //verificar se Celular ja foi cadastrado
            try {
                const verificarCelular = yield Usuario_1.Usuario.findOne({ Celular: Celular });
                if (verificarCelular) {
                    return res.status(422).json({
                        msg: "Celular ja cadastrado!",
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    msg: error,
                });
            }
            //conferir senha e confirmSenha
            if (Senha !== ConfirmaSenha) {
                return res.status(422).json({
                    msg: "Senha e ConfirmSenha nao sao iguais",
                });
            }
            //criando Usuario no banco de dados.
            try {
                const salt = bcrypt_1.default.genSaltSync(10);
                const criptografar = bcrypt_1.default.hashSync(Senha, salt);
                const CriandoUsuario = {
                    SeuNome,
                    Email,
                    Celular,
                    Senha: criptografar,
                    PrimeiroContato,
                    MateriaEscolhida,
                    Acesso: "Aguardando"
                };
                yield Usuario_1.Usuario.create(CriandoUsuario);
                return res.status(201).json({ msg: 'Usuario criado com sucesso' });
            }
            catch (error) {
                return res.status(500).json({ msg: error });
            }
        });
    }
    criandoLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Senha } = req.body;
            try {
                const usuarioExistente = yield Usuario_1.Usuario.findOne({ Email: Email });
                if (!usuarioExistente) {
                    return res.status(400).json({ msg: "E-mail nao cadastrado!" });
                }
                else {
                    if (usuarioExistente.Email === 'administrador') {
                        const checarSenha = bcrypt_1.default.compareSync(Senha, usuarioExistente.Senha);
                        if (checarSenha) {
                            return (0, criando_token_1.default)(usuarioExistente, req, res);
                        }
                        else {
                            return res.status(400).json({ msg: "Senha incorreta!" });
                        }
                    }
                    else {
                        const checarSenha = bcrypt_1.default.compareSync(Senha, usuarioExistente.Senha);
                        if (checarSenha) {
                            return (0, criando_token_1.default)(usuarioExistente, req, res);
                        }
                        else {
                            return res.status(400).json({ msg: "Senha incorreta!" });
                        }
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ msg: error });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = 'teste';
            yield Usuario_1.Usuario.deleteOne({ Email: user });
            res.json({ msg: 'deletado com sucesso!!' });
        });
    }
}
exports.default = new ControlandoUsuarios();
