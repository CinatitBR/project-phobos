import userModel from '../models/userModel.js'

const findByEmail = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findByEmail(email)

    res.json(user)
  }
  catch(e) {
    console.log(e)
    
    return res
      .status(500)
      .json({message: 'Oh, no! There was an error. Please, try again'})
  }
}

const userController = { findByEmail }

export default userController