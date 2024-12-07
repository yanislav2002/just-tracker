import { Router } from 'express'
import { LoginParams, RegisterParams } from '../model/AuthModel'

const router = Router()

const isRegisterParams = (value: unknown): value is RegisterParams => {
  return  value !== null && typeof value === 'object'
    && 'mail' in value && typeof value.mail === 'string'
    && 'username' in value && typeof value.username === 'string'
    && 'password' in value && typeof value.password === 'string'
    && 'repeatPassword' in value && typeof value.repeatPassword === 'string'
}

const isLoginParams = (value: unknown): value is LoginParams => {
  return  value !== null && typeof value === 'object'
    && 'mail' in value && typeof value.mail === 'string'
    && 'password' in value && typeof value.password === 'string'
}

router.post('/login', async (req, res) => {
  if(!isLoginParams(req.body)) {
    //TODO handle
  }
  
})

router.post('/register', async (req, res) => {
  if(!isRegisterParams(req.body)) {
    //TODO handle
  }
  
})

export default router
