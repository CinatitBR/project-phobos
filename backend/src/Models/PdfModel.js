import db from '../services/db.js'

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

const PdfModel = { create }

export default PdfModel