import express from 'express'
import router from './routes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})