import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import pdfModel from '../models/pdfModel.js'

const mimeExtensions = { 'application/pdf': 'pdf' }

const upload = extension => {
  const allowedExtension = extension

  const fileFilter = (req, file, cb) => {
    const { mimetype } = file
    const fileExtension = mimeExtensions[mimetype]

    if (fileExtension !== allowedExtension) {
      const error = new Error(`File not allowed. Please, upload a ${extension} file`) 

      cb(error, false)
      return
    }
  
    cb(null, true)
  }

  const setDestination = (req, file, cb) => {
    const { userId } = req.body
    const { mimetype } = file
  
    const fileExtension = mimeExtensions[mimetype]
  
    const storagePath = process.env.STORAGE_PATH
    const userFolder = `user${userId}`
    const filePath = path.join(storagePath, userFolder, fileExtension)
  
    cb(null, filePath)
  }
  
  const setFilename = async (req, file, cb) => {
    const { userId } = req.body
    const { mimetype, originalname } = file
  
    const fileExtension = mimeExtensions[mimetype] 
    const filename = `${uuidv4()}.${fileExtension}`
    const title = path.parse(originalname).name
  
    try {
      await pdfModel.create({filename, title,  userId})
  
      cb(null, filename)
    }
    catch (e) {
      cb(e)
    }
  }

  const storage = multer.diskStorage({
    destination: setDestination,
    filename: setFilename
  })

  const upload = multer({ storage, fileFilter })
  return upload.single(extension)
}

export default upload