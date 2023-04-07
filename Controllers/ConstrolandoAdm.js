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
        

        res.json({TodosUsuarios,UsuariosAguardando,UsuariosPorMateriaFront,UsuariosPorMateriaBack})
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
        const { Materia, Titulo, Detalhes, Desafios} = req.body
        
        console.log(req.body)
        const materia = {
            Materia,
            Titulo,
            Detalhes,
            Desafios
        }
        
        await Materias.create(materia)
        res.json({materia})
    }
}
