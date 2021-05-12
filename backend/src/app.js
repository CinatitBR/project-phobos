import path from 'path'
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const mimeExtensions = { 'application/pdf': 'pdf' }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId } = req.body
    const { mimetype } = file

    const fileExtension = mimeExtensions[mimetype]

    const storagePath = 'C:\\Users\\Igor\\Documents\\phobos-storage'
    const userFolder = `user${userId}`
    const fileStoragePath = path.join(storagePath, userFolder, fileExtension)

    cb(null, fileStoragePath)
  },

  filename: (req, file, cb) => {
    const { mimetype } = file

    const fileExtension = mimeExtensions[mimetype] 
    const filename = `${uuidv4()}.${fileExtension}`

    cb(null, filename)
  }
})

const upload = multer({ storage })

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/pdf/upload', upload.single('pdf'), (req, res) => {
  res.json({message: 'ok'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})