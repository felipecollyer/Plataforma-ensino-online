import {Schema , model,Document} from "mongoose"


interface Iusuarios extends Document {
        SeuNome: string,
        Email: string,
        Celular: number,
        Senha: string,
        ConfirmaSenha: string,
        PrimeiroContato: string,
        MateriaEscolhida: string,
        Acesso: string,
}


const usuariosSchema =  new Schema({
        SeuNome: String,
        Email: String,
        Celular: Number,
        Senha: String,
        ConfirmaSenha: String,
        PrimeiroContato: String,
        MateriaEscolhida: String,
        Acesso: String,
})

export const Usuario = model<Iusuarios>('xUsuario', usuariosSchema)

