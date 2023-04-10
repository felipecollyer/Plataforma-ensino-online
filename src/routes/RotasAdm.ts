import{ Router} from 'express'


const router = Router()


import ControlandoAdm from '../Controllers/ControlandoAdm'


router.post('/admin', ControlandoAdm.logandoAdmin)
router.get('/admin/all', ControlandoAdm.mostrandoUsuarios)
router.patch('/admin/edit/:id', ControlandoAdm.editandoUsuarios)
router.post('/admin/create/materias', ControlandoAdm.criandoMaterias)

export = router