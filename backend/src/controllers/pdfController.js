import fs from 'fs'
import path from 'path'
import PDFParser from 'pdf2json'
import pdfModel from '../models/pdfModel.js'
import getPages from '../utils/getPages.js'
import pageModel from '../models/pageModel.js'

const pdfParser = new PDFParser(null, 1);

// Handle PDF parsing and add pages to database
const upload = async (req, res) => {
  const { userId } = req.body
  const { filename, size } = req.file
  const { id: pdfId } = await pdfModel.findByFilename(filename)

  // Get PDF file path
  const storagePath = process.env.STORAGE_PATH
  const userFolder = `user${userId}`
  const filePath = path.join(storagePath, userFolder, 'pdf', filename)

  // ---------------
  const pdfStream = fs.createReadStream(filePath)

  // Parse PDF to JSON object
  pdfStream.pipe(pdfParser)
    .on('pdfParser_dataReady', async pdfData => { // Parsing is finished
      // Get PDF pages data
      const pages = getPages(pdfData)

      // Add pages to database
      for (const page of pages) {
        const {number, body} = page

        await pageModel.create({ pdfId, number, body })
      }

      // Send successful response
      return res.sendStatus(201)
    })
    .on('pdfParser_dataError', errData => { // Parsing error
      console.error('errData.parserError')
    })
}

const search = async (req, res) => {
  try {
    const { keyword } = req.body

    const documentPreviews = await pdfModel.search(keyword)
    res.json(documentPreviews)
  }
  catch(e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const pdfController = {
  upload,
  search
}

export default pdfController