import db from '../db.js'

const create = async ({ filename, title, userId }) => {
  const sql = `
    INSERT INTO pdf (filename, title, user_id)
    VALUES (?, ?, ?)
  `

  try {
    await db.query(sql, [filename, title, userId])
  } 
  catch (e) {
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
    SELECT pdf.title as pdf_title, pdf.filename as filename, page.number, 
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

const pdfModel = { create, findByFilename, search }

export default pdfModel