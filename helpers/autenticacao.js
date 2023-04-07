module.exports = (objetoRecebido) => {
    const Objeto = objetoRecebido;

    if (
        !Objeto.SeuNome ||
        !Objeto.Email ||
        !Objeto.Celular ||
        !Objeto.Senha ||
        !Objeto.PrimeiroContato ||
        !Objeto.MateriaEscolhida
    ) {
        return true;
    }
};
