# App-Gerenciamento-de-Conteudos-online

Um sistema de estudos online onde o usuario pode acessar somente aquela materia no qual ele se inscreveu.

**Libs Utilizadas:**

- _Express_
- _MongoDB_
- _JWT_
- _Bcrypt_

## Descrição do Funcionamento:

### Primeiro criar o ADMINISTRADOR DA APLICACAO, com a rota :

http://localhost:3000/cadastrar _-Usando o metodo POST enviado o json dessa maneira:_

{
"SeuNome":**"administrador"**,
"Email":**"administrador"**,
"Senha":**"administrador"**
}

### Segundo passo criar uma materia de acesso aos alunos com a rota :

http://localhost:3000/admin/create/materias _- Usando o metodo POST enviado o json dessa maneira:_

- _neste exemplo criaria um material de frontEnd_

```json
{
  {
    "AreaDeAtuacao":**"Front-end"**,
    "Conteudos": {
      "Materia":[{
        `Etapa 1`: Fundamentos do desenvolvimento web,
         `Detalhes`
            1. HTML(HyperText Markup Language)
            2. CSS (Cascading Style Sheets)
            3. JavaScript (JS)",
        `Desafios`:
          "Desafio: Crie uma página web simples com HTML, CSS e JS, incluindo cabeçalho, corpo e rodapé."
      }, {
    "Titulo":
      `Etapa 2`: Aprofundamento em CSS e design responsivo,
      "Detalhes":"Flexbox / CSS Grid / Media Queries / Bootstrap ou outro framework CSS (opcional)",
      "Desafios":"Desafio: Adapte a página web criada anteriormente para ser responsiva em diferentes dispositivos e resoluções."
    }]
  }
}
```

### Terceiro passo criar uma usuario normal ao sistema

http://localhost:3000/cadastrar _-Usando o metodo POST enviado o json dessa maneira:_

```Json
{
    "SeuNome":**"teste"**,
    "Email":**"teste@hotmail.com"**,
    "Celular":**21997645425**,
    "Senha":**"teste"**,
    "ConfirmaSenha":**"teste"**,
    "PrimeiroContato":**"sim"**,
    "MateriaEscolhida":**"Front-end"**
}
```

_Apos o cadastro, o usuario aguarda a aprovacao dele no sistema, que e liberada apenas pelo administrador, pegando seu Id no banco de dados. Sem essa aprovacao o usuario entra em uma pagina que diz que esta aguardando aprovacao do cadastro._

### Quarto passo, liberar o acesso do Usuario pegando o ID do mesmo pelo banco de DADOS:

http://localhost:3000/admin/edit/:id _- USANDO O METODO PATCH, ele pega esse usuario e muda o acesso dele de 'aguardando' para 'ativo' e entao o usuario e redirecionado, para o material que ele escolheu. No exemplo acima foi criado a materia de Front-end, entao ele vai buscar a materiaEscolhida pelo usaurio(Front-end) com a AreaDeAtuacao criada pelo administrador (Front-end)._

### finalizando temos a rota GET

http://localhost:3000/admin/all _-com ela e possivel ver todo o sistema criado com todos os usuarios inscritos, usuarios que estao ativo, usuarios que estao aguardando, e todas as materias criadas._
