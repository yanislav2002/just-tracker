import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardModel, postNewBoard } from './BoardsApi'
import ThunkStatus from '../../util/ThunkStatus'

type State = {
  creatingBoard: ThunkStatus
  boards: BoardModel[]
  isCreateBoardModalOpen: boolean
  isFilterModalOpen: boolean
}

const initialState: State = {
  creatingBoard: { status: 'idle' },
  boards: [],
  isCreateBoardModalOpen: false,
  isFilterModalOpen: false,
}

export const postNewBoardAsync = createAsyncThunk('boards/postNewBoard', async (newBoard: BoardModel, { dispatch, rejectWithValue }) => {
  try {
    const board = await postNewBoard(newBoard)
    dispatch(boardCreated(board))
    return board
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
    boardCreated: (state, action: PayloadAction<BoardModel>) => {
      state.boards.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewBoardAsync.pending, (state) => {
        state.creatingBoard.status = 'loading'
      })
      .addCase(postNewBoardAsync.fulfilled, (state) => {
        state.creatingBoard.status = 'succeeded'
      })
      .addCase(postNewBoardAsync.rejected, (state) => {
        state.creatingBoard.status = 'failed'
      })
  },
})

export const selectCreateBoardModalStatus = (state: RootState) => state.boards.isCreateBoardModalOpen

export const { createBoardModalOpened, boardCreated } = boardsSlice.actions
export default boardsSlice.reducer
