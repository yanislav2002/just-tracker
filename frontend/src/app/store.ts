import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import boardReducer from '../features/boards/BoardsSlice'
import authReducer from '../features/auth/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
