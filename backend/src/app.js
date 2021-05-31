import express from 'express'
import router from './routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.SERVER_PORT

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})