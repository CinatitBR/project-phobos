import path from 'path'
import PDFParser from 'pdf2json'
import pdfModel from '../models/pdfModel.js'
import getPages from '../utils/getPages.js'
import pageModel from '../models/pageModel.js'

// Add PDF to database and handle parsing
const upload = async (req, res) => {
  const pdfParser = new PDFParser(null, 1)

  const { userId, existingTagId, newTagName, isPublic } = req.body
  const { filename, originalname, path: filePath, size } = req.file
  const title = path.parse(originalname).name

  let tagId = null

  // If newTagName exists, add to database and get its id
  if (newTagName) {
    tagId = await pdfModel.createTag(userId, newTagName)
  }
  else { // if newTagName doesn't exist, use existingTagId as tagId
    tagId = existingTagId
  }

  // Add file to database
  const pdfId = await pdfModel.create({
    userId, 
    filename, 
    title, 
    tagId, 
    size, 
    isPublic: (isPublic === 'true' ? 1 : 0)
  })
  
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
    res.json({ pdfId })
  })

  // Start PDF parsing to json object
  pdfParser.loadPDF(filePath)
}

const findAll = async (req, res) => {
  try {
    const { userId } = req.body 

    const files = await pdfModel.findAll(userId)

    res.json({ files })
  } catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
}

const findPublic = async (req, res) => {
  try {
    const { page, userId } = req.query

    const publicDocuments = await pdfModel.findPublic(page, userId)

    res.json(publicDocuments)
  } catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
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

const findAllTag = async (req, res) => {
  try {
    const { userId } = req.body

    const tags = await pdfModel.findAllTag(userId)

    res.json(tags)
  }
  catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
}

const findTagById = async (req, res) => {
  try {
    const { tagId } = req.body

    const tag = await pdfModel.findTagById(tagId)

    res.json(tag)
  }
  catch (e) {
    console.log(e)

    return res
      .status(500)
      .json({ message: 'Oh, no! There was an error. Please, try again' })
  }
}

const stars = async (req, res) => {
  try {
    const { action, pdfId, userId } = req.body

    await pdfModel.stars(action, pdfId, userId)

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
  findAll,
  search,
  destroy,
  findAllTag,
  findTagById,
  findPublic,
  stars
}

export default pdfController