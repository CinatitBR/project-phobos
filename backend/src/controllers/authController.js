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
    const { id, username } = await userModel.findByEmail(email)

    const payload = {id, username}
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    // Generate tokens
    const accessToken = jwt.sign(
      payload, 
      accessTokenSecret, 
      {expiresIn: '20m'}
    )
    const refreshToken = jwt.sign(
      payload,
      refreshTokenSecret,
      {expiresIn: '1y'}
    )

    // Store refresh token in database
    await refreshTokenModel.create(id, refreshToken)

    // Set the refresh token in a HttpOnly cookie
    // cookie expires in 1 year
    res.cookie('refresh_token', refreshToken, { 
      maxAge: 31536000000,
      httpOnly: true
    })

    // Send access token
    return res.json({accessToken})
  }
  catch (e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const authController = { register, login }

export default authController