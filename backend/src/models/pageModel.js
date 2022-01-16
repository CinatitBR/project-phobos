import db, { pool } from '../db.js'

// const create = async ({pdfId, number, body}) => {
//   const sql = `
//     INSERT INTO page (pdf_id, number, body)
//     VALUES (?, ?, ?)
//   `

//   try {
//     await db.query(sql, [pdfId, number, body])
//   }
//   catch (e) {
//     throw new Error(e)
//   }
// }

const create = async ({ pdfId, number, body }) => {
  const sql = `
    INSERT INTO page (pdf_id, number, body)
    VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(sql, [pdfId, number, body]);
  }
  catch (e) {
    throw new Error(e)
  }
}

const pageModel = { create }

export default pageModel