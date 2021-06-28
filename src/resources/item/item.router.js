import {Router} from 'express'
import controllers from '../item/item.controllers'

const router = Router()

router.route('/').get(controllers.getOne).post(controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  // .delete(controllers.delete)

export default router
