import "express-async-errors"
import app from "./app"
import conn from "./db/conn"

//conectando ao banco
conn()
  .then(() => {
    app.listen(3000)
  })
  .catch(() => {
    console.log('error ao conectar o banco de dados')
  })
