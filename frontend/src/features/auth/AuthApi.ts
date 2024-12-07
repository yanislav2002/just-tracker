import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export type LoginParams = {
  mail: string
  password: string
}

export type RegisterParams = {
  username: string
  password: string
  repeatPassword: string
  mail: string
}

export const postLoginParams = async (params: LoginParams) => {
  const res = await axios.post('/auth/login', params)

  return res.data
}
