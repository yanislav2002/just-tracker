import Board from "../models/Board";
import { BoardModel } from "../types/BoardsModel";


export const createBoard = async (boardParams: BoardModel, userId: string) => {
  try {
    const newBoard = await Board.create({ ...boardParams, userId })

    console.log(newBoard)

    return newBoard
  } catch (error: unknown) {
    console.log(error)
  }
}

export const getAllBoards = async (userId: string) => {
  try {
    const boards = await Board.find({ userId: userId })
    
    console.log(boards)
    
    return boards
  } catch (error: unknown) {
    console.log(error)
  }
}