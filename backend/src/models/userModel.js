import pool from '../db.js';

const create = async ({ email, username, password }) => {
  try {
    const sql = `
      INSERT INTO user_account (email, username, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    const { rows } = await pool.query(sql, [email, username, password]);

    return rows[0];
  }
  catch (e) {
    throw new Error(e)
  }
}

const findByEmail = async (email) => {
  try {
    const sql = `
      SELECT * 
      FROM user_account 
      WHERE email = $1
    `

    const { rows } = await pool.query(sql, [email])

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
      SELECT user_account.* 
      FROM user_account
      INNER JOIN refresh_token
      ON user_account.id = refresh_token.user_id
      WHERE refresh_token = $1
    `

    const { rows } = await pool.query(sql, [refreshToken])

    const user = rows[0]

    return user
  }
  catch (e) {
    throw new Error(e)
  }
}

const userModel = { create, findByEmail, findByRefreshToken }

export default userModel