import path from 'path'
import express from 'express'
import handleUpload from './middlewares/handleUpload.js'
import PDFParser from 'pdf2json'

const router = express.Router()
const pdfParser = new PDFParser(null, 1);

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/pdf/upload', handleUpload('pdf'), (req, res) => {
  const { userId } = req.body
  const { filename } = req.file

  const storagePath = process.env.STORAGE_PATH
  const userFolder = `user${userId}`

  const filePath = path.join(storagePath, userFolder, 'pdf', filename)
  
  pdfParser.on("pdfParser_dataError", errData => { 
    console.error(errData.parserError)
  })

  pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(JSON.stringify(pdfData))
  });

  pdfParser.loadPDF(filePath)

  res.json({message: 'ok'})
})

export default router