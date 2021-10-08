import db from '../db.js'

const create = async (userId, refreshToken) => {
  try {
    const query = `
      INSERT INTO refresh_token (user_id, refresh_token) 
      VALUES (?, ?)    
    `

    await db.query(query, [userId, refreshToken])
  }
  catch (e) {
    throw new Error(e)
  }
}

const destroy = async (refreshToken) => {
  try {
    const query = `
      DELETE FROM refresh_token 
      WHERE refresh_token = ?
    `

    await db.query(query, refreshToken)
  }
  catch (e) {
    throw new Error(e)
  }
}

const find = async (refreshToken) => {
  try {
    const query = `
      SELECT * FROM refresh_token
      WHERE refresh_token = ?
    `

    const [rows, fields] = await db.query(query, refreshToken)

    return rows[0]
  }
  catch (e) {
    throw new Error(e)
  }
}

const refreshTokenModel = { create, destroy, find }

export default refreshTokenModel