import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: String,
  mail: {
    type: String,
    unique: true, 
  },  
  password: String
})

const User = mongoose.model('User', userSchema)

export default User