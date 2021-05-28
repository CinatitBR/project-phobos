import userModel from '../models/userModel.js'

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body

    await userModel.create({email, username, password})
    return res.sendStatus(201)
  }
  catch (e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const authController = { register }

export default authController