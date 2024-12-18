import { Router } from 'express'
import authController from './controllers/authController'
import boardController from './controllers/boardController'

const router = Router()

router.use('/auth', authController)
router.use('/boards', boardController)

export default router
