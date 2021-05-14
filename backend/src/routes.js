import path from 'path'
import express from 'express'
import handleUpload from './middlewares/handleUpload.js'
import PDFParser from 'pdf2json'
import preparePdfData from './utils/preparePdfData.js'
import pdfModel from './models/pdfModel.js'
import pageModel from './models/pageModel.js'

const router = express.Router()
const pdfParser = new PDFParser(null, 1);

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/pdf/upload', handleUpload('pdf'), async (req, res) => {
  const { userId } = req.body
  const { filename } = req.file
  const { id: pdfId } = await pdfModel.findByFilename(filename)

  const storagePath = process.env.STORAGE_PATH
  const userFolder = `user${userId}`

  const filePath = path.join(storagePath, userFolder, 'pdf', filename)
  
  pdfParser.on("pdfParser_dataError", (errData) => { 
    console.error(errData.parserError)
  })

  pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    const { pages } = preparePdfData(pdfData)
    
    for (const page of pages) {
      const { number, body } = page

      await pageModel.create({ pdfId, number, body })
    }
  })

  pdfParser.loadPDF(filePath)

  res.json({message: 'ok'})
})

export default router