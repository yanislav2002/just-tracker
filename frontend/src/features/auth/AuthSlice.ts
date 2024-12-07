import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginParams, postLoginParams } from './AuthApi'

type State = {
  userDetails: {
    mail: string | undefined
    username: string | undefined
    password: string | undefined
  }
  isRadioLogin: boolean
}

const initialState: State = {
  userDetails: {
    mail: undefined,
    username: undefined,
    password: undefined,
  },
  isRadioLogin: true,
}

export const postLoginParamsAsync = createAsyncThunk('auth/postLoginParams', async (params: LoginParams, {}) => {
  const isLogin = await postLoginParams(params)
  console.log(isLogin)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    radioLoginChanged: (state, action: PayloadAction<boolean>) => {
      state.isRadioLogin = action.payload
    },
  },
})

export const { radioLoginChanged } = authSlice.actions
export default authSlice.reducer
