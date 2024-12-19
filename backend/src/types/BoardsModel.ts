export type BoardType = 'dailyRoutinesBoard' | 'projectBoard' | 'customBoard'

export type ItemType = 'task' | 'other'

export type Item = {
  id?: string
  boardId: string
  name: string
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
