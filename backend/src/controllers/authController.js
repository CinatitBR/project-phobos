import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    // Generate tokens
    const accessToken = jwt.sign(
      {}, 
      accessTokenSecret, 
      {expiresIn: '20m'}
    )
    const refreshToken = jwt.sign(
      {},
      refreshTokenSecret,
      {expiresIn: '1y'}
    )

    // Store refresh token in database
    await refreshTokenModel.create(userId, refreshToken)

    // Set the refresh token in a HttpOnly cookie
    // cookie expires in 1 year
    res.cookie('refreshToken', refreshToken, { 
      maxAge: 31536000000,
      httpOnly: true
    })

    // Send access token and user data
    return res.json({ accessToken, user })
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

  if (!authHeader) {
    return res.sendStatus(401)
  }

  // Check if access token is valid
  const accessToken = authHeader.split('Bearer ')[1]
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET 

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

  // Check if token exists in database
  const refreshTokenExists = await refreshTokenModel.find(refreshToken)

  if (!refreshTokenExists) {
    return res.sendStatus(403)
  }

  // Check if token is valid
  try {
    jwt.verify(refreshToken, refreshTokenSecret)
  }
  catch (e) {
    return res.sendStatus(403)
  }

  // Create new access token
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
  const accessToken = jwt.sign(
    {}, 
    accessTokenSecret, 
    {expiresIn: '20m'}
  )

  return res.json({accessToken})
}

const authController = { register, login, logout, refreshToken }

export default authController