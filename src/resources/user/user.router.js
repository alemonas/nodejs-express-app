import {Router} from 'express'
import {me, createMe, updateMe} from './user.controllers'

const router = Router()

router.get('/', me)
router.post('/', createMe)
router.put('/', updateMe)

export default router
