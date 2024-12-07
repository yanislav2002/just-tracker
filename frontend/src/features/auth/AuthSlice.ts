import { createSlice } from '@reduxjs/toolkit'

type State = {
  username: string
  password: string
  mail: string
}

const initialState: State = {
  username: '',
  password: '',
  mail: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export default authSlice.reducer
