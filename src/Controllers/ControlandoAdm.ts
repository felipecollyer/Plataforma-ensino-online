import { Request, Response } from "express"

import { materias } from "../Models/Materias"
import { Usuario } from "../Models/Usuario"
import { NaoAutorizado, NotFoundError } from "../halpers/apiError"

class ControlandoAdm {

  public async logandoAdmin(req: Request, res: Response) {
    const { Email, Senha } = req.body

    //Checando dados recebidos
    const EmailRecebido = await Usuario.findOne({ Email: Email })

    //verificar Senha
    if (!EmailRecebido)
      throw new NotFoundError("Acesso negado")

    if (!(Senha == EmailRecebido.Senha))
      throw new NaoAutorizado("Acesso negado")

    return res.status(200).json({ messag: "Bem vindo" })
  }

  public async mostrandoUsuarios(req: Request, res: Response) {

    const UsuariosAguardando = await Usuario.find({ Acesso: "Aguardando" })
    const UsuariosAtivados = await Usuario.find({ Acesso: "Ativo" })
    const TodosUsuarios = await Usuario.find()
    const MostrarMaterias = await materias.find()

    return res.json({ TodosUsuarios, UsuariosAtivados, UsuariosAguardando, MostrarMaterias })
  }

  public async editandoUsuarios(req: Request, res: Response) {
    const id = req.params.id
    materias.findOne({ _id: id })
    const UsuariosAguardando = await Usuario.findOne({ _id: id })

    if (UsuariosAguardando) {
      UsuariosAguardando.Acesso = "Ativo"
      await UsuariosAguardando.save()
      res.json({ msg: "Usuario com acesso ATIVO." })
    }
  }

  public async criandoMaterias(req: Request, res: Response) {

    const { AreaDeAtuacao, Conteudos } = req.body

    interface Imateria {
      AreaDeAtuacao: string,
      Conteudos: {
        type: object,
        Materia: [
          {
            Titulo: string,
            Detalhes: string,
            Desafios: string
          }
        ]
      }
    }

    const criandoMateria: Imateria = {
      AreaDeAtuacao,
      Conteudos,
    }

    materias.create(criandoMateria)

    return res.status(201).json({ msg: "Conteudo criado com sucesso!" })
  }
}

export default new ControlandoAdm()
