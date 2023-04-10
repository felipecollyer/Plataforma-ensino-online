import{ Router} from 'express'


const router = Router()


const ControlandoAdm = require('../Controllers/ControlandoAdm')


//router.post('/admin', ControlandoAdm.logandoAdmin)
router.get('/admin/all', ControlandoAdm.mostrandoUsuarios)
//router.patch('/admin/edit/:id', ControlandoAdm.editandoUsuarios)
//router.post('/admin/create/materias', ControlandoAdm.criandoMaterias)

export = router