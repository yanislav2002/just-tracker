import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginParams, postLoginParams } from './AuthApi'
import { RootState } from '../../app/store'

export type AuthMode = 'login' | 'register'

type State = {
  userDetails: {
    mail: string | undefined
    username: string | undefined
    password: string | undefined
  }
  authMode: AuthMode
}

const initialState: State = {
  userDetails: {
    mail: undefined,
    username: undefined,
    password: undefined,
  },
  authMode: 'login',
}

export const postLoginParamsAsync = createAsyncThunk('auth/postLoginParams', async (params: LoginParams, {}) => {
  const isLogin = await postLoginParams(params)
  console.log(isLogin)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    radioLoginChanged: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload
    },
  },
})

export const selectAuthDetails = (state: RootState) => state.auth

export const { radioLoginChanged } = authSlice.actions
export default authSlice.reducer
