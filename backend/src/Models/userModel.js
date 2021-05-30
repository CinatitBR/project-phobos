import db from '../db.js'

const create = async ({ email, username, password }) => {
  try {
    const sql = `
      INSERT INTO user (email, username, password)
      VALUES (?, ?, ?)
    `

    await db.query(sql, [email, username, password])
  }
  catch (e) {
    throw new Error(e)
  }
}

const findByEmail = async (email) => {
  try {
    const sql = `
      SELECT * FROM user 
      WHERE email = ?
    `

    const [rows, fields] = await db.query(sql, email)

    const user = rows[0]
    return user
  }
  catch (e) {
    throw new Error(e)
  }
}

const userModel = { create, findByEmail }

export default userModel