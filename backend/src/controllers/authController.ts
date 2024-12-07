import { Router } from 'express'

const router = Router()

export default router

router.post('/login', async (req, res) => {})

router.post('/register', async (req, res) => {
  console.log(req.body)
})
