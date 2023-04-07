require("dotenv").config();
const express = require("express");
const conn = require("./db/conn");
const app = express();
const RotasUsuario = require("./routes/RotasUsuario");
const RotasAdm = require("./routes/RotasAdm");


//configure json Express
app.use(express.json());

app.use("/", RotasUsuario);

app.use("/", RotasAdm);

app.get("/", (req, res) => {
    return res.status(200).json({ msg: "bem vindo SouDev" });
});

//conectando ao banco
conn()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
