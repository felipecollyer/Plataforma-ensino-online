const express = require('express')
const router = express.Router()

const ControlandoAdm = require('../Controllers/ConstrolandoAdm')


router.post('/admin', ControlandoAdm.logandoAdmin)
router.get('/admin/all', ControlandoAdm.mostrandoUsuarios)
router.patch('/admin/edit/:id', ControlandoAdm.editandoUsuarios)
router.post('/admin/create/materias', ControlandoAdm.criandoMaterias)

module.exports = router