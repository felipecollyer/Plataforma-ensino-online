const Usuario = require("../models/Usuario");
const Materias = require('../models/Materias')
const VerificarRespostas = require("../helpers/autenticacao");
const {VerificarUsuarioEmail} = require("../helpers/VerificarUsuario");
const {VerificarUsuarioCelular} = require("../helpers/VerificarUsuario");




module.exports = class ControlandoUsuarios {
    static async criandoCadastro(req, res) {
        const {
            SeuNome,
            Email,
            Celular,
            Senha,
            ConfirmaSenha,
            PrimeiroContato,
            MateriaEscolhida,
        } = req.body;

        //respostas do usuario
        const RespostaUsuario = {
            SeuNome,
            Email,
            Celular,
            Senha,
            ConfirmaSenha,
            PrimeiroContato,
            MateriaEscolhida,
            Acesso : 'Aguardando'
        };

        //criando administrador
        if(  RespostaUsuario.SeuNome == 'administrador' && RespostaUsuario.Email == 'administrador' && RespostaUsuario.Senha == 'administrador') {
            const criarAdministrador = {
                SeuNome,
                Email,
                Senha,
                Acesso : 'administrador'
            };
            const verificarEmail = await Usuario.findOne({email : RespostaUsuario.Email })

            if(verificarEmail) {
                return res.status(200).json({
                    msg: "Criacao de admin invalida",
                });
            }else{
                await Usuario.create(criarAdministrador)
                return res.status(200).json({
                    msg: "Administrador criado com sucesso!",
                });
            }
        }

      //veririfcar campos vazio
        if (VerificarRespostas(RespostaUsuario)) {
            return res.status(200).json({
                msg: "Algum campo esta vazio",
            });
        }

        //verificar se Email ja foi cadastrado
        if (await VerificarUsuarioEmail(RespostaUsuario.Email)) {
            return res.status(200).json({
                msg: "Email ja cadastrado!",
            });
        }

        //verificar se Celular ja foi cadastrado
        if(await VerificarUsuarioCelular(RespostaUsuario.Celular)){
            return res.status(200).json({
                msg:'Celular, ja cadastrado'
            })
        }

        //conferir senha e confirmSenha
        if(Senha !== ConfirmaSenha) {
            return res.status(200).json({
                msg: "Senha e ConfirmSenha nao sao iguais",
            });
        }

       //criando Usuario no banco de dados.
        await Usuario.create(RespostaUsuario)
        return res.status(200).json({
            msg: "Usuario criado com sucesso! Aguarde a aprovacao do seu cadastro.",
        });
    }

    static async criandoLogin(req,res) {
        const {Email, Senha} = req.body

        const verificarEmail = await Usuario.findOne({Email: Email})
        
        if(verificarEmail) {
            //checar a senha com email
            if(Senha == verificarEmail.Senha) {
                if(verificarEmail.Acesso !== 'Ativo'){
                    return res.json({msg:'Aguarde aprovacao do seu cadastro!'})
                }else {

                    const PegarMateriaDoUsuario = await verificarEmail.MateriaEscolhida
                    
                    const PegarMateriaDados = await Materias.findOne({AreaDeAtuacao: PegarMateriaDoUsuario})
                    
                    
                    const PlanoDeEstudos = PegarMateriaDados.Conteudos

                    return res.json({PlanoDeEstudos})
                }
            }else {
                return res.json({msg:'Senha incorreta!'})
            }
        }
    }

};

