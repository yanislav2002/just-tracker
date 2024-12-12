import { Request, Response, Router } from 'express'
import { LoginParams, RegisterParams } from '../types/AuthModel'
import { login, register } from '../services/authService'


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

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isLoginParams(req.body)) {
      res.status(400).json({ error: 'Incorrect login params' })
      return
    }

    const isSuccessfull = await login(req.body);

    if (!isSuccessfull) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    res.status(200).json({ message: 'Login successful' })
  } catch (error: unknown) {
    console.error(error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.post('/register', async (req, res): Promise<void> => {
  try {
    if(!isRegisterParams(req.body)) {
      res.status(400).json({ error: 'Incorrect register params' })
      return
    }
    
    const isSuccessfull = await register(req.body)
    
    if (!isSuccessfull) {
      res.status(401).json({ error: 'mail already used' })
      return
    }
    
    res.status(200).json({ message: 'Register successful' })
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred' })
  }  
})

export default router
