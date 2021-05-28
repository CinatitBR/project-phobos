import * as yup from 'yup'
import userModel from '../../../backend/src/models/userModel.js'

const registerSchema = yup.object({
  email: yup.string().email().required().test(
    'email-exists',
    'This email already exists',
    async email => !((await userModel.findByEmail(email)).length > 0)
  ),
  username: yup.string().trim().max(255).required(),
  password: yup.string().trim().max(255).required()
})

export default registerSchema