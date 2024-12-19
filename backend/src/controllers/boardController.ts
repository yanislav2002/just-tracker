import { Request, Response, Router } from "express";
import { createBoard, createItem, deleteBoard, getAllBoards } from "../services/boardService";
import { BoardModel } from "../types/BoardsModel";


const router = Router()

router.post('/getAllBoards', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    
    if (typeof userId != 'string') { 
      res.status(400).json({ error: 'Incorrect userId' })
      return  
    }
    
    const boards = await getAllBoards(userId)
    
    if (!boards) {
      res.status(401).json({ error: 'No boards' })
      return
    }
    
    res.status(200).json(boards) //todo return ut like boardModel
    return 
  } catch (error: unknown) {
    console.log(error)
  }
})

router.post('/createBoard', async (req: Request, res: Response) => {
  try {
    const { newBoard, userId } = req.body
    
    //todo isboard validation
    if (typeof userId != 'string') {
      res.status(400).json({ error: 'Incorrect board params' })
      return  
    }
    
    const createdBoard = await createBoard(newBoard, userId)
    
    if (!createdBoard) {
      res.status(401).json({ error: 'Problem while creating board' })
      return
    }
    
    res.status(200).json(createdBoard) //todo return ut like boardModel
    return 
  } catch (error: unknown) {
    console.log(error)
  }
})

router.post('/createItem', async (req: Request, res: Response) => {
  try {
    const newItem = req.body
    
    //todo isboard validation
    // if (typeof userId != 'string') {
    //   res.status(400).json({ error: 'Incorrect board params' })
    //   return  
    // }
    
    const createdItem = await createItem(newItem)
    
    // if (!createdBoard) {
    //   res.status(401).json({ error: 'Problem while creating board' })
    //   return
    // }
    
    res.status(200).json(createdItem) //todo return ut like boardModel
    return 
  } catch (error: unknown) {
    console.log(error)
  }
})

router.post('/deleteBoard', async (req: Request, res: Response) => { //todo fix whole request
  try {
    const boardId = req.body
    
    //todo isboard validation
    // if (typeof userId != 'string') {
    //   res.status(400).json({ error: 'Incorrect board params' })
    //   return  
    // }
    
    await deleteBoard(boardId)
    
    // if (!createdBoard) {
    //   res.status(401).json({ error: 'Problem while creating board' })
    //   return
    // }
    
    res.status(200).json(true) //todo return ut like boardModel
    return 
  } catch (error: unknown) {
    console.log(error)
  }
})

export default router