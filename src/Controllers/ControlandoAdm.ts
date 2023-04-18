import { Request, Response } from "express"
import { Usuario } from "../Models/Usuario"
import { materias } from "../Models/Materias"
import PegarToken  from '../helpers/pegando-token'
import { JwtPayload } from "jsonwebtoken"
import  jwt from 'jsonwebtoken'


class ControlandoAdm {

  public async mostrandoUsuarios(req: Request, res: Response) {

    let adminAcessando

    if(req.headers.authorization) {

      const token = PegarToken(req)

      if(token) {
        const acessandoToken = jwt.verify(token, 'meuSecret') as JwtPayload

          if(acessandoToken.acesso === 'administrador') {
            try {
              const adminAcessando = {
                 UsuariosAguardando : await Usuario.find({ Acesso: "Aguardando" }).select('-_id'),
                 UsuariosAtivados : await Usuario.find({ Acesso: "Ativo" }).select('-_id'),
                 TodosUsuarios : await Usuario.find().select('-_id'),
                 MostrarMaterias : await materias.find()
              }
              return res.status(201).json({ adminAcessando })
            } catch (error) {
              return res.status(500).json({ msg: error })
            }

          }else{
            return res.status(403).json({ msg: 'Area restrita para adm' })
           }
      }
    }else {
        adminAcessando = null
        res.send(adminAcessando)
    }
  }

  public async editandoUsuarios(req: Request, res: Response) {
    const idRecebido = req.params.id
    try { 
      if(idRecebido) {
        const UsuariosAguardando = await Usuario.findOne({ _id: idRecebido })

        if (UsuariosAguardando) {
          UsuariosAguardando.Acesso = "Ativo"
          await UsuariosAguardando.save()
          return res.status(201).json({ msg: "Usuario alterado para acesso ATIVO." })
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: 'id invalido ou incorreto' })
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
    
    const ArrayRecebidoDeConteudos = criandoMateria.Conteudos.Materia
    const VerificarCamposDeMaterias = ArrayRecebidoDeConteudos.map((materia, index) => {
        if(!materia.Titulo || !materia.Detalhes || !materia.Desafios) {
          return index + 1
        }else{
          return false 
        }
    } )

    if(criandoMateria.AreaDeAtuacao) {
      
      const verificarCamposFalse = VerificarCamposDeMaterias.filter(materia => {
          if(materia) {
            return materia
          }
      })
  
      if(verificarCamposFalse.length != 0) {
        return res.status(400).json({msg: `Preencha os campos da materia ${verificarCamposFalse} corretamente.`})
      }else {
        try {
          materias.create(criandoMateria)
          return res.status(201).json({msg: 'Materia criada com sucesso'})
        } catch (error) {
          return res.status(500).json({msg: error})
        }
      }
    }
  }
}

export default new ControlandoAdm()
