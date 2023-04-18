import { Request, Response } from "express"
import { Usuario } from "../Models/Usuario"
import { materias } from "../Models/Materias"
import { NaoAutorizado } from "../halpers/apiError"

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
    const RespostaUsuario = {
      SeuNome,
      Email,
      Celular,
      Senha,
      ConfirmaSenha,
      PrimeiroContato,
      MateriaEscolhida,
      Acesso: "Aguardando"
    }

    //criando administrador
    if (RespostaUsuario.SeuNome == "administrador" && RespostaUsuario.Email == "administrador" && RespostaUsuario.Senha == "administrador") {
      const criarAdministrador = {
        SeuNome,
        Email,
        Senha,
        Acesso: "administrador"
      }
      const verificarEmail = await Usuario.findOne({ email: RespostaUsuario.Email })

      if (verificarEmail) {
        throw new NaoAutorizado("Criação de admin invalid")
      } else {
        await Usuario.create(criarAdministrador)
        return res.status(200).json({
          msg: "Administrador criado com sucesso!",
        })
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
    )
      throw new NaoAutorizado("Verifique os dados e tente novamente")

    //verificar se Email ja foi cadastrado
    if (await Usuario.findOne({ Email: RespostaUsuario.Email }))
      throw new NaoAutorizado("Senha incorreta!")

    //verificar se Celular ja foi cadastrado
    if (await Usuario.findOne({ Celular: RespostaUsuario.Celular }))
      throw new NaoAutorizado("Celular já cadrastado!")

    //conferir senha e confirmSenha
    if (Senha !== ConfirmaSenha)
      throw new NaoAutorizado("Senhas incompativeis!")

    //criando Usuario no banco de dados.
    await Usuario.create(RespostaUsuario)
    return res.status(200).json({
      msg: "Usuario criado com sucesso! Aguarde a aprovacao do seu cadastro.",
    })
  }

  public async criandoLogin(req: Request, res: Response) {
    const { Email, Senha } = req.body

    const verificarEmail = await Usuario.findOne({ Email: Email })

    if (!verificarEmail)
      throw new NaoAutorizado("Email ou Senha incorreta!")

    if (Senha == verificarEmail.Senha) {
      if (verificarEmail.Acesso !== "Ativo") {
        return res.json({ msg: "Aguarde aprovacao do seu cadastro!" })
      } else {

        const PegarMateriaDoUsuario = await verificarEmail.MateriaEscolhida

        const PegarMateriaDados = await materias.findOne({ AreaDeAtuacao: PegarMateriaDoUsuario })

        return res.json({ PegarMateriaDados })
      }
    } else {
      throw new NaoAutorizado("Senha incorreta!")
    }
  }
}

export default new ControlandoUsuarios()
