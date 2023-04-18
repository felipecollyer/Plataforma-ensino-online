"use strict";
const PegarToken = (req) => {
    const autorizacao = req.headers.authorization;
    if (autorizacao) {
        const token = autorizacao.split(' ')[1];
        return token;
    }
};
module.exports = PegarToken;
