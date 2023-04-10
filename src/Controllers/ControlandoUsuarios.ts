/*import { Request, Response } from "express";
import { Usuario } from "../Models/Usuario";
import { materias } from "../Models/Materias";

class ControlandoUsuarios {

    public async criandoCadastro(req:Request, res:Response) {
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
        if (
        !RespostaUsuario.SeuNome ||
        !RespostaUsuario.Email ||
        !RespostaUsuario.Celular ||
        !RespostaUsuario.Senha ||
        !RespostaUsuario.PrimeiroContato ||
        !RespostaUsuario.MateriaEscolhida
    ){
        return res.status(200).json({
            msg: "Algum campo esta vazio",
        });
    }
        

        //verificar se Email ja foi cadastrado
        const verificarEmail = await Usuario.findOne({ Email: RespostaUsuario.Email });
    
        if (verificarEmail) {
                return res.status(200).json({
                    msg: "Email ja cadastrado!",
                });
        } 
        

        //verificar se Celular ja foi cadastrado
        const verificarCelular = await Usuario.findOne({ Celular: RespostaUsuario.Celular});

        if (verificarCelular) {
            return res.status(200).json({
                msg: "Celular ja cadastrado!",
            });
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


    public async criandoLogin(req:Request, res:Response) {
        const {Email, Senha} = req.body

        const verificarEmail = await Usuario.findOne({Email: Email})
        
        if(verificarEmail) {
            //checar a senha com email
            if(Senha == verificarEmail.Senha) {
                if(verificarEmail.Acesso !== 'Ativo'){
                    return res.json({msg:'Aguarde aprovacao do seu cadastro!'})
                }else {

                    const PegarMateriaDoUsuario = await verificarEmail.MateriaEscolhida
                    
                    const PegarMateriaDados = await materias.findOne({AreaDeAtuacao: PegarMateriaDoUsuario})

                    return res.json({PegarMateriaDados})
                }
            }else {
                return res.json({msg:'Senha incorreta!'})
            }
        }
    //}

    }

}

export default new ControlandoUsuarios()

*/