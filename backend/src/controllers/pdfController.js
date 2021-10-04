import path from 'path'
import PDFParser from 'pdf2json'
import pdfModel from '../models/pdfModel.js'
import getPages from '../utils/getPages.js'
import pageModel from '../models/pageModel.js'

// Handle PDF parsing and add pages to database
const upload = async (req, res) => {
  const pdfParser = new PDFParser(null, 1)

  const { userId } = req.body
  const { filename } = req.file
  const { id: pdfId } = await pdfModel.findByFilename(filename)

  // Get PDF file path
  const storagePath = process.env.STORAGE_PATH
  const userFolder = `user${userId}`
  const filePath = path.join(storagePath, userFolder, 'pdf', filename)
  
  // PDF parsing error
  pdfParser.on('pdfParser_dataError', errData => { 
    console.error(errData.parserError)
  })

  // PDF parsing to json object is finished
  pdfParser.on('pdfParser_dataReady', async pdfData => {
    // Get PDF pages data
    const pages = getPages(pdfData)

    // Add pages to database
    for (const page of pages) {
      const { number, body } = page

      await pageModel.create({ pdfId, number, body })
    }

    // Send successful response
    res.sendStatus(201)
  })

  // Start PDF parsing
  pdfParser.loadPDF(filePath)
}

const search = async (req, res) => {
  try {
    const { keyword } = req.body

    const documentPreviews = await pdfModel.search(keyword)
    res.json(documentPreviews)
  }
  catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
}

const destroy = async (req, res) => {
  try {
    const { pdfId } = req.body

    // Delete PDF from database
    await pdfModel.destroy(pdfId)

    res.sendStatus(200)
  }
  catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
}

const pdfController = {
  upload,
  search,
  destroy
}

export default pdfController