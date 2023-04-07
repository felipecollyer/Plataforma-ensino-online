const Usuario = require('../models/Usuario')
const Materias = require('../models/Materias')



module.exports = class ControlandoAdm {
    static async logandoAdmin(req,res){
    const { Email, Senha} = req.body

    //Checando dados recebidos
    const EmailRecebido = await Usuario.findOne({Email : Email})

    if(EmailRecebido) {
        //verificar Senha
        if(Senha == EmailRecebido.Senha){
            res.status(200).json({msg:"bem vindo ao admin"})
        }else{
            res.status(200).json({msg:"Acesso negado"})
        }  
    }else {
        res.status(200).json({msg:"Acesso negado"})
    }
    }

    static async mostrandoUsuarios(req,res) {
        
        //busca de dados p/ dashboard
        const UsuariosAguardando = await Usuario.find({Acesso:'Aguardando'})
        const UsuariosAtivado = await Usuario.find({Acesso:'Ativado'})
        const TodosUsuarios = await Usuario.find()
        const UsuariosPorMateriaFront= await Usuario.find({MateriaEscolhida: 'FrontEnd'})
        const UsuariosPorMateriaBack = await Usuario.find({MateriaEscolhida: 'BackEnd'})
        const MostrarMaterias = await Materias.find()

        res.json({TodosUsuarios,UsuariosAguardando,UsuariosPorMateriaFront,UsuariosPorMateriaBack,MostrarMaterias})
    }

    static async editandoUsuarios(req,res) {
        const id = req.params.id
        //busca de dados p/ dashboard
        const UsuariosAguardando = await Usuario.findOne({_id:id})

        if(UsuariosAguardando) {
            UsuariosAguardando.Acesso = 'Ativo'
            await UsuariosAguardando.save()
            res.json({msg:'Usuario com acesso ATIVO.'})
        }
    }

    static async criandoMaterias(req,res) {
        const { AreaDeAtuacao, Conteudos} = req.body
        
        const criandoMateria = {
            AreaDeAtuacao,
            Conteudos,
        }
        
        await Materias.create(criandoMateria)
        res.json({criandoMateria})
    }
}
