import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const mimeExtensions = { 'application/pdf': 'pdf' }

// Store uploaded PDF on storage
const upload = extension => {
  const allowedExtension = extension

  // Filter file extension
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

  // Define where file should be stored
  const setDestination = (req, file, cb) => {
    const { userId } = req.body
    const { mimetype } = file
  
    const fileExtension = mimeExtensions[mimetype]
  
    const storagePath = process.env.STORAGE_PATH
    const userFolder = `user${userId}`
    const filePath = path.join(storagePath, userFolder, fileExtension)
  
    cb(null, filePath)
  }
  
  // Define storage filename
  const setFilename = async (req, file, cb) => {
    const { mimetype } = file
    const fileExtension = mimeExtensions[mimetype] 
    const filename = `${uuidv4()}.${fileExtension}`
  
    cb(null, filename)
  }

  const storage = multer.diskStorage({
    destination: setDestination,
    filename: setFilename
  })

  // Create multer middleware
  const upload = multer({ storage, fileFilter })
  return upload.single(extension)
}

export default upload