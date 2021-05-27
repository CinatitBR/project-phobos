import express from 'express'
import handleUpload from './middlewares/handleUpload.js'
import pdfController from './controllers/pdfController.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/pdf/upload', handleUpload('pdf'), pdfController.upload)

export default router