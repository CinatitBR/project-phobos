import axios from 'axios'
import bcrypt from 'bcryptjs'

const getInnerErrors = (validationError) => {
  const errors = {}
  
  for (const error of validationError.inner) {
    const { path: field, message } =  error
    
    // If a field has multiple errors, get only the first error
    if (!errors[field]) errors[field] = message
  }

  return errors
}

const handleValidationError = async validationExpression => {
  try {
    await validationExpression

    return {}
  }
  catch (validationError) {
    const errors = getInnerErrors(validationError)

    return errors
  }
}

const emailExists = async email => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/user/find-by-email`, 
    { email: email }
  )

  const user = response.data

  return user ? true : false
}

const isPasswordCorrect = async (password, emailRelated) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/user/find-by-email`, 
    { email: emailRelated }
  )
  const user = response.data
  
  // If user doesn't exist, 
  // finish password validation with success
  if (!user) return true

  // Get hashed password and compare
  const {password: hashedPassword} = user
  const match = await bcrypt.compare(password, hashedPassword)

  return match
}

export { 
  getInnerErrors,
  handleValidationError,
  emailExists, 
  isPasswordCorrect
}