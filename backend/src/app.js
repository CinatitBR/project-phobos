import express from 'express'
import router from './routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT
const STORAGE_PATH = process.env.STORAGE_PATH
const corsConfig = cors({
  credentials: true, 
  origin: process.env.CORS_ORIGIN
}) 

app.use(corsConfig)
app.use(cookieParser())
app.use(express.json())
app.use('/storage', express.static(STORAGE_PATH))
app.use(router)

app.get('/', (req, res) => {
  res.json({ message: "Its working!!!" });
});

console.log({ dirname: __dirname })

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})