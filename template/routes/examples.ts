import { Router } from 'express'
import ExampleController from '@Controllers/ExampleController'

const router = Router()
const controller = new ExampleController()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export default router
