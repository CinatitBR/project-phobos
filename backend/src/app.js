import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/pdf/upload', (req, res) => {
  res.json({ message: `You've sent ${JSON.stringify(req.body)}`})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})