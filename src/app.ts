import express from "express"

import RotasAdm from "./routes/RotasAdm"
import RotasUsuario from "./routes/RotasUsuario"
import { ErrosMiddleware } from "./middlewares/erros"

require("dotenv").config()

const app = express()

//configure json Express
app.use(express.json())

app.use("/", RotasUsuario)

app.use("/", RotasAdm)

app.use(ErrosMiddleware)

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "bem vindo SouDev" })
})

export = app
