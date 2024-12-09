export type BoardType = 'dailyRoutinesBoard' | 'projectBoard' | 'customBoard'

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