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

const userModel = { create }

export default userModel