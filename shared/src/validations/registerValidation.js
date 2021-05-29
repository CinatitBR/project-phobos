import * as yup from 'yup'
import axios from 'axios'
import createValidation from '../utils/createValidation.js'

const emailExists = async (email) => {
  const response = await axios.post('http://localhost:5000/user/find-by-email', {
    email: email
  })

  const user = response.data

  return user.length > 0
}

const registerSchema = yup.object({
  email: yup.string().email().required().test(
    'email-exists',
    'This email already exists',
    async email => !(await emailExists(email))
  ),
  username: yup.string().trim().max(255).required(),
  password: yup.string().max(255).required()
})

const registerValidation = createValidation(registerSchema)

export default registerValidation