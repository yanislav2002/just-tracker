import User from "../models/User";
import { LoginParams, RegisterParams } from "../types/AuthModel";


export const login = async (params: LoginParams) => {
  try {
    const user = await User.findOne({ mail: params.mail })
    
    if (user && user.password === params.password) {
      return true
    } 
    
    return false
  } catch (error: unknown) {
    console.log(error)
    return false
  }
}

export const register = async (params: RegisterParams) => {
  try {
    const user = await User.findOne({ mail: params.mail })
    
    if (user) {
      throw new Error('Email already exists')
    }
    
    const createdUser = await User.create(params)
    
    if (createdUser) {
      return true
    } else {
      return false
    }
  } catch (error: unknown) {
    console.log(error)
    return false
  }
}