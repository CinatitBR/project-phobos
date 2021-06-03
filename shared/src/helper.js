import axios from 'axios'
import bcrypt from 'bcryptjs'

const getInnerErrors = (validationError) => {
  const errors = {}

  for (const error of validationError.inner) {
    const { path: field, message } =  error
    
    errors[field] = message
  }

  return errors
}

const handleValidationError = async validationExpression => {
  try {
    await validationExpression
  }
  catch (validationError) {
    const errors = getInnerErrors(validationError)

    return errors
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
  getInnerErrors,
  handleValidationError,
  emailExists, 
  isPasswordCorrect
}