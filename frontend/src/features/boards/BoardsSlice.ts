import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardModel, createBoard, getAllBoards } from './BoardsApi'
import ThunkStatus from '../../util/ThunkStatus'


type State = {
  creatingBoard: ThunkStatus
  gettingAllBoards: ThunkStatus
  boards: BoardModel[]
  isCreateBoardModalOpen: boolean
  isCreateItemModalOpen: boolean
  isFilterModalOpen: boolean
}

const initialState: State = {
  creatingBoard: { status: 'idle' },
  gettingAllBoards: { status: 'idle' },
  boards: [],
  isCreateBoardModalOpen: false,
  isCreateItemModalOpen: false,
  isFilterModalOpen: false
}

export const createBoardAsync = createAsyncThunk(
  'boards/createBoard',
  async (payload: { newBoard: BoardModel; userId: string }) => {
    return await createBoard(payload.newBoard, payload.userId)
  }
)

export const getAllBoardsAsync = createAsyncThunk(
  'boards/getAllBoards',
  async (userId: string) => {
    return await getAllBoards(userId)
  }
)

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createBoardModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isCreateBoardModalOpen = action.payload
    },
    createItemModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isCreateItemModalOpen = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoardAsync.pending, (state) => {
        state.creatingBoard.status = 'loading'
      })
      .addCase(createBoardAsync.fulfilled, (state, action: PayloadAction<any>) => { //todo remove any and add real type
        const newBoard: BoardModel = { //todo check this props if it is existiing
          id: action.payload._id,
          name: action.payload.name,
          type: action.payload.type,
          columns: action.payload.columns,
          isCompleted: action.payload.isCompleted,
          deadline: action.payload.deadline,
          color: action.payload.color
        }

        if (!state.boards.find(board => board.id === action.payload.userId)) {
          state.boards.push(newBoard)
        }

        state.creatingBoard.status = 'succeeded'
        state.isCreateBoardModalOpen = false
      })
      .addCase(createBoardAsync.rejected, (state) => {
        state.creatingBoard.status = 'failed'
      })

      .addCase(getAllBoardsAsync.pending, (state) => {
        state.gettingAllBoards.status = 'loading'
      })
      .addCase(getAllBoardsAsync.fulfilled, (state, action: PayloadAction<any>) => { //todo remove any and add real type
        const boards = action.payload.map((board: any) => { //todo fix this bullshit any
          return {
            id: board._id,
            name: board.name,
            type: board.type,
            columns: board.columns,
            isCompleted: board.isCompleted,
            deadline: board.deadline,
            color: board.color
          }
        })
        
        state.boards = boards
        state.gettingAllBoards.status = 'succeeded'
      })
      .addCase(getAllBoardsAsync.rejected, (state) => {
        state.gettingAllBoards.status = 'failed'
      })
  },
})

export const selectCreateBoardModalStatus = (state: RootState) => state.boards.isCreateBoardModalOpen
export const selectCreateItemModalStatus = (state: RootState) => state.boards.isCreateItemModalOpen
export const selectAllBoards = (state: RootState) => state.boards.boards

export const { createBoardModalOpened, createItemModalOpened } = boardsSlice.actions
export default boardsSlice.reducer
