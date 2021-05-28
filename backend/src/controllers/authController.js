import userModel from '../models/userModel.js'

const register = (req, res) => {
  try {
    const { email, username, password } = req.body

    userModel.create({email, username, password})
    res.sendStatus(201)
  }
  catch (e) {
    res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const authController = { register }

export default authController