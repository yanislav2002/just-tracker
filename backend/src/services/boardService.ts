import mongoose from "mongoose"
import Board from "../models/Board"
import { BoardModel, TaskItem } from "../types/BoardsModel"
import { v4 as uuidv4 } from 'uuid'


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

export const deleteBoard = async (boardId: string) => {
  try {
    console.log(boardId)
    
    
    const a = new mongoose.Types.ObjectId(boardId)
    
    const deletedBoard = await Board.deleteOne({ _id: a })
    
    console.log(deletedBoard)
 
    return deletedBoard
  } catch (error: unknown) {
    console.log(error)
  }
}

export const createItem = async (itemParams: TaskItem) => { //todo change TaskItem to Item
  try {
    const board = await Board.find({ _id: itemParams.boardId }).lean()
    
    if (!board) {
      throw new Error(`Board with ID ${itemParams.boardId} not found.`)
    }

    const newTask = {
      _id: `task-${uuidv4()}`,
      boardId: itemParams.boardId,
      name: itemParams.name,
      type: itemParams.type,
      description: itemParams.description
    }
    
    // const columnKey = Object.keys(board.columns).find(key => Array.isArray(board.columns[key]))

    if (board) {
      await Board.updateOne(
        {_id: itemParams.boardId}, {
        $push: { 'columns.todo': newTask, },
      })
    }

  } catch (error: unknown) {
    console.log(error)
  }
}