import { mkdirSync } from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import token from '../utils/token.js'
import userModel from '../models/userModel.js'
import refreshTokenModel from '../models/refreshTokenModel.js'

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body

    // Trim username and hash password
    const trimmedUsername = username.trim()
    const hashedPassword = await bcrypt.hash(password, 10)

    // Add user to database
    const results = await userModel.create({
      email, 
      username: trimmedUsername, 
      password: hashedPassword
    })

    // Get user id
    const userId = results.insertId

    // Create user folder
    const folderPath = path.join(process.env.STORAGE_PATH, `user${userId}`, 'pdf')
    mkdirSync(folderPath, { recursive: true })

    return res.sendStatus(201)
  }
  catch (e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const login = async (req, res) => {
  try {
    const { email } = req.body
    const { id: userId, username } = await userModel.findByEmail(email)

    const user = {userId, username}

    // Create tokens
    const { accessToken, accessTokenExpiration } = token.createAccessToken()
    const { refreshToken, refreshTokenExpiration } = token.createRefreshToken()

    // Store refresh token in database
    await refreshTokenModel.create(userId, refreshToken)

    // Set the refresh token in a HttpOnly cookie.
    res.cookie('refreshToken', refreshToken, { 
      maxAge: refreshTokenExpiration,
      httpOnly: true
    })

    // Send access token and user data
    return res.json({ 
      accessToken, 
      expiresIn: accessTokenExpiration, 
      user 
    })
  }
  catch (e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    // If refreshToken cookie doesn't exist, send code 401
    if (!refreshToken) {
      return res.sendStatus(401)
    }
  
    // Remove refresh token from database
    await refreshTokenModel.destroy(refreshToken)
    
    // Clear refreshToken cookie
    res.clearCookie('refreshToken', { httpOnly: true })

    res.sendStatus(200)
  }
  catch (e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

  // If refreshToken cookie doesn't exist, send code 401
  if (!refreshToken) {
    return res.sendStatus(401)
  }

  // Check if refresh token exists in database.
  // If refresh token exists in database, method will return a user. 
  const user = await userModel.findByRefreshToken(refreshToken)

  if (!user) {
    return res.sendStatus(401)
  }

  // Check if refresh token is valid
  try {
    jwt.verify(refreshToken, refreshTokenSecret)
  }
  catch (e) {
    return res.sendStatus(401)
  }

  // Create access token
  const { accessToken, accessTokenExpiration } = token.createAccessToken()

  return res.json({ 
    accessToken, 
    expiresIn: accessTokenExpiration, 
    user 
  })
}

const authController = { 
  register, 
  login, 
  logout, 
  refreshToken
}

export default authController