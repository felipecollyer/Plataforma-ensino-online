"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const ControlandoUsuarios_1 = __importDefault(require("../Controllers/ControlandoUsuarios"));
const router = (0, express_1.Router)();
router.post("/cadastrar", ControlandoUsuarios_1.default.criandoCadastro);
router.post("/login", ControlandoUsuarios_1.default.criandoLogin);
router.delete('/delete', ControlandoUsuarios_1.default.deleteUsuario);
module.exports = router;
