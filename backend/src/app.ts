import express from 'express'
import router from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5174' }))
app.use('/', router)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000...')
})
