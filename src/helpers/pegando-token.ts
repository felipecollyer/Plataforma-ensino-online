import { Request } from "express"

const PegarToken = (req:Request) => {

    const autorizacao = req.headers.authorization
    
    if(autorizacao){
        const token = autorizacao.split(' ')[1]
        return token
    }
}

export = PegarToken