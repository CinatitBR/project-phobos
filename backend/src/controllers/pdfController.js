import path from 'path'
import PDFParser from 'pdf2json'
import pdfModel from '../models/pdfModel.js'
import preparePdfData from '../utils/preparePdfData.js'
import pageModel from '../models/pageModel.js'

const pdfParser = new PDFParser(null, 1);

const upload = async (req, res) => {
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

  res.json({message: 'deu certinho bosta mano pqp'})
}

const pdfController = {
  upload
}

export default pdfController