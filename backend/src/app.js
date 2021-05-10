import express from 'express'
import multer from 'multer'
import cors from 'cors'

const app = express()
const upload = multer({ dest: './uploads' })

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/pdf/upload', upload.single('pdf') ,(req, res) => {
  console.log(req.file)
  res.json({message: 'ok'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})