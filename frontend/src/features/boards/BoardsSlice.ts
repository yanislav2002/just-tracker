import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type BoardType = 'dailyRoutinesBoard' | 'projectBoard' | 'customBoard'

//maybe the string will be changed to some type of card
export type DailyRoutinesColumns = {
  todo: string[]
  inProgress: string[]
  done: string[]
}

export type ProjectColumns = {
  backLog: string[]
  todo: string[]
  inProgress: string[]
  done: string[]
}

export type BoardModel = {
  name: string
  type: BoardType
  columns: DailyRoutinesColumns | ProjectColumns
  isCompleted: boolean
  deadline: string
  color: string
}

type State = {
  boards: BoardModel[]
  isNewBoardModalOpen: boolean
  isFilterModalOpen: boolean
}

const initialState: State = {
  boards: [],
  isNewBoardModalOpen: false,
  isFilterModalOpen: false,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    newBoardModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isNewBoardModalOpen = action.payload

      console.log(state.isNewBoardModalOpen)
    },
  },
})

export const selectNewBoardModalStatus = (state: RootState) => state.boards.isNewBoardModalOpen

export const { newBoardModalOpened } = boardsSlice.actions
export default boardsSlice.reducer
