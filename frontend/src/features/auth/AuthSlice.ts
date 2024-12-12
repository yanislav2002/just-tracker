import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginParams, postLoginRequest, postRegisterRequest, RegisterParams } from './AuthApi'
import { RootState } from '../../app/store'
import ThunkStatus from '../../util/ThunkStatus'


export type AuthMode = 'login' | 'register'

type State = {
  loginStatus: ThunkStatus
  registerStatus: ThunkStatus
  logoutStatus: ThunkStatus
  userId: string | undefined
  authMode: AuthMode
}

const initialState: State = {
  loginStatus: { status: 'idle'},
  registerStatus: { status: 'idle'},
  logoutStatus: { status: 'idle'},
  userId: undefined,
  authMode: 'login',
}

export const postRegisterRequestAsync = createAsyncThunk('auth/postRegisterRequest', async (params: RegisterParams, { dispatch }) => {
  try {
    const response = await postRegisterRequest(params)
    
    if (!response) {
      throw new Error('Error while register!')
    }
    
    dispatch(userIdAdded(params.mail))
  } catch (error: unknown) {
    console.log(error)
  }
})

export const postLoginRequestAsync = createAsyncThunk('auth/postLoginRequest', async (params: LoginParams, { dispatch }) => {
  try {
    const response = await postLoginRequest(params)
     
    if (!response) {
      throw new Error('Error while login!')
    }
    
    dispatch(userIdAdded(params.mail))
  } catch (error: unknown) {
    console.log(error)
  }
})

// export const postLogoutRequestAsync = createAsyncThunk('auth/postLogoutRequest', async (_, {}) => {
//   try {
//     const response = await postLogoutRequest()
    
//     if (!response) {
//       throw new Error('Error while logout!')
//     }
//   } catch (error: unknown) {
//     console.log(error)
//   }
// })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    radioLoginChanged: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload
    },
    userIdAdded: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    logout: (state) => {
      state.userId = undefined
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postRegisterRequestAsync.pending, (state) => {
        state.registerStatus.status = 'loading'
      })
      .addCase(postRegisterRequestAsync.fulfilled, (state) => {
        state.registerStatus.status = 'succeeded'
      })
      .addCase(postRegisterRequestAsync.rejected, (state) => {
        state.registerStatus.status = 'failed'
        state.userId = undefined
      })
      .addCase(postLoginRequestAsync.pending, (state) => {
        state.loginStatus.status = 'loading'
      })
      .addCase(postLoginRequestAsync.fulfilled, (state) => {
        state.loginStatus.status = 'succeeded'
      })
      .addCase(postLoginRequestAsync.rejected, (state) => {
        state.loginStatus.status = 'failed'
        state.userId = undefined
      })
      // .addCase(postLogoutRequestAsync.pending, (state) => {
      //   state.logoutStatus.status = 'loading'
      // })
      // .addCase(postLogoutRequestAsync.fulfilled, (state) => {
      //   state.logoutStatus.status = 'succeeded'     
      //   state.userId = undefined
      // })
      // .addCase(postLogoutRequestAsync.rejected, (state) => {
      //   state.logoutStatus.status = 'failed'
      // })
  },
})

export const selectAuthDetails = (state: RootState) => state.auth

export const { radioLoginChanged, userIdAdded, logout } = authSlice.actions
export default authSlice.reducer
