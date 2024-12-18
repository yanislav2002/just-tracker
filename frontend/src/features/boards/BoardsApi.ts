import axios from 'axios'

export type BoardType = 'dailyRoutinesBoard' | 'projectBoard' | 'customBoard'

export type ItemType = 'task' | 'other'

export type Item = {
  name: string,
  type: string
}

export type TaskItem = Item & {
  description: string
}

export type DailyRoutinesColumns = {
  todo: Item[]
  inProgress: Item[]
  done: Item[]
}

export type ProjectColumns = {
  backLog: Item[]
  todo: Item[]
  inProgress: Item[]
  done: Item[]
}

export type BoardModel = {
  id?: string
  name: string
  type: BoardType
  columns: DailyRoutinesColumns | ProjectColumns
  isCompleted: boolean
  deadline: string
  color: string
}

export const getAllBoards = async (userId: string) => {
  const res = await axios.post('/boards/getAllBoards', { userId })

  if (res.status !== 200) {
    console.log('error')
  }

  //todo check type of res.data
  // console.log(res.data)

  return res.data
}

export const createBoard = async (newBoard: BoardModel, userId: string) => {
  const res = await axios.post('/boards/createBoard', { newBoard, userId })

  if (res.status !== 200) {
    console.log('error')
  }

  //todo check type of res.data
  // console.log(res.data)

  return res.data
}