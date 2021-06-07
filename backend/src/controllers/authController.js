import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import token from '../utils/token.js'
import userModel from '../models/userModel.js'
import refreshTokenModel from '../models/refreshTokenModel.js'

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body

    const trimmedUsername = username.trim()
    const hashedPassword = await bcrypt.hash(password, 10)

    await userModel.create({
      email, 
      username: trimmedUsername, 
      password: hashedPassword
    })
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
  const { refreshToken } = req.cookies
  const authHeader = req.headers['authorization']

  // Check if authorization header exists
  if (!authHeader) {
    return res.sendStatus(401)
  }

  const accessToken = authHeader.split('Bearer ')[1]
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET 

  // Check if access token is valid
  try {
    jwt.verify(accessToken, accessTokenSecret)
  }
  catch (e) {
    return res.sendStatus(403)
  }

  // Remove refresh token from database
  await refreshTokenModel.destroy(refreshToken)

  res.sendStatus(200)
}

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

  if (!refreshToken) {
    return res.sendStatus(401)
  }

  // Check if refresh token exists in database.
  // If refresh token exists in database, method will return a user. 
  const user = await userModel.findByRefreshToken(refreshToken)

  if (!user) {
    return res.sendStatus(403)
  }

  // Check if refresh token is valid
  try {
    jwt.verify(refreshToken, refreshTokenSecret)
  }
  catch (e) {
    return res.sendStatus(403)
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