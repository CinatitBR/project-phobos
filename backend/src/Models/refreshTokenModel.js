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

const refreshTokenModel = { create }

export default refreshTokenModel