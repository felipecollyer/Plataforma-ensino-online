const Usuario = require("../models/Usuario");

const VerificarUsuarioEmail = async (ObjetoEmail) => {
    const respostaEmail = await Usuario.findOne({ Email: `${ObjetoEmail}` });
    
    if (respostaEmail) {
        return true;
    } else {
        return false
    }
};

const VerificarUsuarioCelular = async (ObjetoCelular) => {
    const respostaCelular = await Usuario.findOne({ Celular: `${ObjetoCelular}`});

    if (respostaCelular) {
        return true;
    } else {
        return false
    }
};

module.exports = {VerificarUsuarioEmail, VerificarUsuarioCelular}

