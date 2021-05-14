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

const pdfModel = { create, findByFilename }

export default pdfModel