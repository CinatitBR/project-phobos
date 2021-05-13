import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import PdfModel from '../models/PdfModel.js'

const mimeExtensions = { 'application/pdf': 'pdf' }

const setDestination = (req, file, cb) => {
  const { userId } = req.body
  const { mimetype } = file

  const fileExtension = mimeExtensions[mimetype]

  const storagePath = 'C:\\Users\\Igor\\Documents\\phobos-storage'
  const userFolder = `user${userId}`
  const fileStoragePath = path.join(storagePath, userFolder, fileExtension)

  cb(null, fileStoragePath)
}

const setFilename = async (req, file, cb) => {
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

const storage = multer.diskStorage({
  destination: setDestination,
  filename: setFilename
})

const upload = multer({ storage })
const handleUpload = {
  pdf: upload.single('pdf')
}

export default handleUpload