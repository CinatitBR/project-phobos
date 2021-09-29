import express from 'express'
import router from './routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.SERVER_PORT
const STORAGE_PATH = process.env.STORAGE_PATH

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use('/storage', express.static(STORAGE_PATH))
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})