import { Request, Response } from "express"
import { Usuario } from "../Models/Usuario"
import bcrypt from "bcrypt"
import CriarTokenUsuario from '../helpers/criando-token'


class ControlandoUsuarios {

  public async criandoCadastro(req: Request, res: Response) {
    const {
      SeuNome,
      Email,
      Celular,
      Senha,
      ConfirmaSenha,
      PrimeiroContato,
      MateriaEscolhida,
    } = req.body

    //respostas do usuario
  

    //criando administrador
    if (SeuNome == "administrador" && Email == "administrador" && Senha == "administrador") {

      const VerificarAdm = Usuario.findOne({Email : Email})

      if(!VerificarAdm){
        
        const salt = bcrypt.genSaltSync(10)
        const criptografar = bcrypt.hashSync(Senha, salt)
  
        const criarAdministrador = {
          SeuNome,
          Email,
          Senha : criptografar,
          Acesso: "administrador"
        }
  
        try {
  
          await Usuario.create(criarAdministrador)
          return res.status(201).json({msg:'Administrador criado com sucesso!'})
          
        } catch (error) {
          res.status(500).json({ msg : error})
        }

      }else {
        return res.status(401).json({msg:'Nao e possivel criar administrador.'})
      }


    }
    

    //veririfcar campos vazio
    if(
      !SeuNome ||
      !Email ||
      !Celular ||
      !Senha ||
      !PrimeiroContato ||
      !MateriaEscolhida
    ) {
      return res.status(400).json({
        msg: "Verifique os campos, e preencha os vazios.",
      })
    }

    //verificar se Email ja foi cadastrado
    try {
      const verificarEmail = await Usuario.findOne({ Email: Email })
      if (verificarEmail) {
        return res.status(422).json({
          msg: "Email ja cadastrado!",
        })
      }
    } catch (error) {
      return res.status(500).json({
        msg: error,
      })
    }


    //verificar se Celular ja foi cadastrado
    try {
      const verificarCelular = await Usuario.findOne({ Celular: Celular })
      if (verificarCelular) {
        return res.status(422).json({
          msg: "Celular ja cadastrado!",
        })
      }
      
    } catch (error) {
      return res.status(500).json({
        msg: error,
      })
    }

    //conferir senha e confirmSenha
    if (Senha !== ConfirmaSenha) {
      return res.status(422).json({
        msg: "Senha e ConfirmSenha nao sao iguais",
      })
    }

    //criando Usuario no banco de dados.
    try {

      const salt = bcrypt.genSaltSync(10)
      const criptografar = bcrypt.hashSync(Senha, salt)

      const CriandoUsuario = {
        SeuNome,
        Email,
        Celular,
        Senha : criptografar,
        PrimeiroContato,
        MateriaEscolhida,
        Acesso: "Aguardando"
      }

      await Usuario.create(CriandoUsuario)
      return res.status(201).json({msg: 'Usuario criado com sucesso'})

    } catch (error) {
      return res.status(500).json({msg: error})
    }
  }


  public async criandoLogin(req: Request, res: Response) { 
    const { Email, Senha } = req.body

    try {
      const usuarioExistente = await Usuario.findOne({ Email: Email })
  
      if (!usuarioExistente) {

        return res.status(400).json({ msg: "E-mail nao cadastrado!" })

      }
      else {

        if(usuarioExistente.Email === 'administrador') {
        
          const checarSenha = bcrypt.compareSync(Senha, usuarioExistente.Senha)

          if(checarSenha) {
            return CriarTokenUsuario(usuarioExistente, req, res)
          }else {
            return res.status(400).json({ msg: "Senha incorreta!" })
          }
        } else {
          const checarSenha = bcrypt.compareSync(Senha, usuarioExistente.Senha)

          if(checarSenha) {
            return CriarTokenUsuario(usuarioExistente, req, res)
          }else {
            return res.status(400).json({ msg: "Senha incorreta!" })
          }
        }
      }
    } catch (error) {

      return res.status(500).json({ msg: error })
      
    }
  }

  public async deleteUsuario (req:Request, res:Response){

    const user = 'teste'
    await Usuario.deleteOne({Email : user})
    res.json({msg:'deletado com sucesso!!'})
  }

}

export default new ControlandoUsuarios()
