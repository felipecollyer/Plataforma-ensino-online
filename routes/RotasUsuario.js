const express = require("express");
const router = express.Router();

const ControlandoUsuarios = require("../Controllers/ControlandoUsuarios");

router.post("/cadastrar", ControlandoUsuarios.criandoCadastro);
router.post("/login", ControlandoUsuarios.criandoLogin);



module.exports = router;
