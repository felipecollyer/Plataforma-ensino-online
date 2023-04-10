import  express  from "express";
import RotasUsuario from "./routes/RotasUsuario";
import RotasAdm from "./routes/RotasAdm";


require("dotenv").config();

const conn = require("../db/conn");
const app = express();


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
    .catch(() => {
        console.log('error ao conectar o banco de dados');
    });
