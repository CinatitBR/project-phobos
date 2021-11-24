import db from '../db.js'

const create = async ({ userId, filename, title, tagId, size, isPublic }) => {
  try {
    const sql = `
      INSERT INTO pdf (user_id, filename, title, tag_id, size, is_public)
      VALUES (?, ?, ?, ?, ?, ?)
    `

    const [results, fields] = await db.query(sql, [userId, filename, title, tagId, size, (isPublic ? 1 : 0)])

    // Return inserted id
    return results.insertId
  } 
  catch (e) {
    throw new Error(e)
  }
}

const findAll = async (userId) => {
  try {
    const sql = `SELECT * FROM pdf WHERE user_id = ?`

    const [rows, fields] = await db.query(sql, userId)

    return rows
  } catch(e) {
    throw new Error(e)
  }
}

const findByFilename = async (filename) => {
  const sql = `
    SELECT * FROM pdf
    WHERE filename = ?
  `

  try {
    const [rows, fields] = await db.query(sql, filename)

    return rows[0]
  }
  catch (e) {
    throw new Error(e)
  }
}

const search = async (keyword) => {
  const sql = `
    SELECT page.id, pdf.title as pdf_title, pdf.filename as filename, page.number, 
    SUBSTRING(body, 1, LEAST(char_length(body), 400)) as text
    FROM page
    INNER JOIN pdf
    ON page.pdf_id = pdf.id
    WHERE MATCH(body) AGAINST(?)  
  `

  try {
    const [rows, fields] = await db.query(sql, keyword)

    return rows
  }
  catch(e) {
    throw new Error(e)
  }
}

const destroy = async (pdfId) => {
  try {
    const sql = `
      START TRANSACTION;

      DELETE FROM page
      WHERE pdf_id = ${pdfId};
      
      DELETE FROM pdf 
      WHERE id = ${pdfId};
      
      COMMIT;
    `

    await db.query(sql)

    return
  }
  catch (e) {
    throw new Error(e)
  }
}

// pdf_tag (table)
const createTag = async (userId, tagName) => {
  try {
    const sql = `
      INSERT INTO pdf_tag (user_id, tag_name)
      VALUES (?, ?)
    `

    const [results, fields] = await db.query(sql, [userId, tagName])

    // Return tag id
    return results.insertId
  } 
  catch (e) {
    throw new Error(e)
  }
}

const findTagById = async id => {
  try {
    const sql = `
      SELECT tag_name FROM pdf_tag
      WHERE id = ?
    `

    const [rows, fields] = await db.query(sql, id)

    return rows[0]
  }
  catch (e) {
    throw new Error(e)
  }
}

const findAllTag = async userId => {
  try {
    const sql = `
      SELECT * FROM pdf_tag 
      WHERE user_id = ?
    `

    const [rows, fields] = await db.query(sql, userId)

    return rows
  }
  catch (e) {
    throw new Error(e)
  }
}

const pdfModel = { 
  create, 
  findAll,
  findByFilename, 
  search,
  destroy,
  createTag,
  findAllTag,
  findTagById
}

export default pdfModel