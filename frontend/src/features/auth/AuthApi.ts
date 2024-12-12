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

export const postLoginRequest = async (params: LoginParams) => {
  const res = await axios.post('/auth/login', params)
  
  if (res.status === 200) {
    return true
  }
  
  return false
}

export const postRegisterRequest = async (params: RegisterParams) => {
  const res = await axios.post('/auth/register', params)

  if (res.status === 200) {
    return true
  }
  
  return false
}

// export const postLogoutRequest = async () => {
//   const res = await axios.post('/auth/logout')

//   if (res.status === 200) {
//     return true
//   }
  
//   return false
// }