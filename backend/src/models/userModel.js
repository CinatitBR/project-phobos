import db from '../db.js'

const create = async ({ email, username, password }) => {
  try {
    const sql = `
      INSERT INTO user (email, username, password)
      VALUES (?, ?, ?)
    `

    const [results, fields] = await db.query(sql, [email, username, password])

    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

const findByEmail = async (email) => {
  try {
    const sql = `
      SELECT * 
      FROM user 
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

const findByRefreshToken = async (refreshToken) => {
  try {
    const sql = `
      SELECT user.* 
      FROM user
      INNER JOIN refresh_token
      ON user.id = refresh_token.user_id
      WHERE refresh_token = ?
    `

    const [rows, fields] = await db.query(sql, refreshToken)

    const user = rows[0]
    return user
  }
  catch (e) {
    throw new Error(e)
  }
}

const userModel = { create, findByEmail, findByRefreshToken }

export default userModel