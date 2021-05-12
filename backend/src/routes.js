import path from 'path'
import express from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import PdfModel from './Models/PdfModel.js'

const router = express.Router()
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

  filename: async (req, file, cb) => {
    const { userId } = req.body
    const { mimetype, originalname } = file

    const fileExtension = mimeExtensions[mimetype] 
    const filename = `${uuidv4()}.${fileExtension}`
    const title = path.parse(originalname).name

    try {
      await PdfModel.create({filename, title,  userId})

      cb(null, filename)
    }
    catch (e) {
      cb(e)
    }
  }
})

const upload = multer({ storage })

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/pdf/upload', upload.single('pdf'), (req, res) => {
  res.json({message: 'ok'})
})

export default router