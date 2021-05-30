import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

const checkCredentials = async (req, res, next) => {
  const { email, password } = req.body

  // Try to get user from database
  const user = await userModel.findByEmail(email)

  // If user doesn't exist
  if (!user) {
    return res
      .status(400)
      .json({email: 'This email has not been registered yet'})
  }

  const hashPassword = user.password
  const match = await bcrypt.compare(password, hashPassword)

  // If password is not correct
  if (!match) {
    return res
      .status(400)
      .json({password: 'The password is incorrect'})
  }

  return next()
}

export default checkCredentials