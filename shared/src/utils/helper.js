import axios from 'axios'
import bcrypt from 'bcryptjs'

const handleValidationError = async validateExpression => {
  try {
    await validateExpression
  }
  catch (validationError) {
    const { message: errorMessage } = validationError

    return errorMessage
  }
}

const emailExists = async email => {
  const response = await axios.post(
    'http://localhost:5000/user/find-by-email', 
    { email: email }
  )

  const user = response.data

  return user ? true : false
}

const isPasswordCorrect = async (password, emailRelated) => {
  const response = await axios.post(
    'http://localhost:5000/user/find-by-email', 
    { email: emailRelated }
  )

  const {password: hashedPassword} = response.data

  const match = await bcrypt.compare(password, hashedPassword)

  return match
}

export { 
  handleValidationError,
  emailExists, 
  isPasswordCorrect,
}