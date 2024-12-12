import express from 'express'
import router from './routes'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

const MONGO_DB_PASSWORD = 'notpassowrd'

mongoose.connect(`mongodb+srv://root:${MONGO_DB_PASSWORD}@devcluster.hkshf.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`)
  .then(() => console.log('DB connected successfully'))
  .catch((error: unknown) => console.log(error))

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))
app.use('/', router)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000...')
})
