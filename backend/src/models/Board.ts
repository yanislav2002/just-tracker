import mongoose from "mongoose";


const boardSchema = new mongoose.Schema({
  userId: String,
  name: String,
  type: String,
  columns: Object,
  isCompleted: Boolean,
  deadline: String,
  color: String
})

const Board = mongoose.model('Board', boardSchema)

export default Board