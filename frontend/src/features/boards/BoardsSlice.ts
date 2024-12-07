import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardModel, postNewBoard } from './BoardsApi'

type State = {
  boards: BoardModel[]
  isCreateBoardModalOpen: boolean
  isFilterModalOpen: boolean
}

const initialState: State = {
  boards: [],
  isCreateBoardModalOpen: false,
  isFilterModalOpen: false,
}

export const postNewBoardAsync = createAsyncThunk('boards/postNewBoard', async (newBoard: BoardModel, { rejectWithValue }) => {
  try {
    const data = await postNewBoard(newBoard)
    return data
  } catch (error: unknown) {
    return rejectWithValue(error)
  }
})

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createBoardModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isCreateBoardModalOpen = action.payload

      console.log(state.isCreateBoardModalOpen)
    },
  },
})

export const selectCreateBoardModalStatus = (state: RootState) => state.boards.isCreateBoardModalOpen

export const { createBoardModalOpened } = boardsSlice.actions
export default boardsSlice.reducer
