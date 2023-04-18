import jwt from 'jsonwebtoken';
import { materias } from "../Models/Materias"
import {Request , Response} from 'express'

const CriarTokenUsuario = async (usuario:any, req:Request, res:Response) => {
    //verificando o acesso do usuario que vem:
    if(usuario.Acesso === 'administrador'){
        
        //criando token
        const tokenCreate = jwt.sign({
            id: usuario._id,
            acesso: usuario.Acesso
        }, "meuSecret")
        
        //return token
        res.status(201).json({msg:'Administrador logado com sucesso',
        token:tokenCreate,
        })

    }else{
        const tokenCreate = jwt.sign({
            id: usuario._id,
            acesso: usuario.Acesso
        }, "meuSecret")

        if (usuario.Acesso !== "Ativo") {
            return res.status(200).json({ msg: "Aguarde aprovacao do seu cadastro!"}
            )
          } else {
            try {

              const PegarMateriaDoUsuario = await usuario.MateriaEscolhida
              const PegarMateriaDados = await materias.findOne({ AreaDeAtuacao: PegarMateriaDoUsuario }).select('-_id')
              return res.status(200).json({ PegarMateriaDados, tokenCreate })

           } catch (error) {

             return res.status(500).json({ error })
            }
          }
    }

}

export = CriarTokenUsuario

