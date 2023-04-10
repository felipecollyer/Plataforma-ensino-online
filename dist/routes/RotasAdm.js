"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const ControlandoAdm_1 = __importDefault(require("../Controllers/ControlandoAdm"));
router.post('/admin', ControlandoAdm_1.default.logandoAdmin);
router.get('/admin/all', ControlandoAdm_1.default.mostrandoUsuarios);
router.patch('/admin/edit/:id', ControlandoAdm_1.default.editandoUsuarios);
router.post('/admin/create/materias', ControlandoAdm_1.default.criandoMaterias);
module.exports = router;
