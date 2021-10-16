import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

const isObjectEmpty = obj => {
  for (const value of Object.values(obj)) {
    if (value) return false
  }

  return true
}

const getInnerErrors = validationError => {
  const errors = {}
  
  for (const error of validationError.inner) {
    const { path: field, message } =  error
    
    // If a field has multiple errors, get only the first error
    if (!errors[field]) errors[field] = message
  }

  return errors
}

// Validate schema and get validation errors
const validate = async (schema, data) => {
  try {
    await schema.validate(data, {abortEarly: false})

    return {}
  }
  catch (validationError) {
    const errors = getInnerErrors(validationError)

    return errors
  }
}

const emailExists = async email => {
  const user = await userModel.findByEmail(email)

  return (user ? true : false)
}

const isPasswordCorrect = async (password, emailRelated) => {
  // const response = await axios.post(
  //   'http://localhost:5000/user/find-by-email', 
  //   { email: emailRelated }
  // )
  // const user = response.data

  const user = await userModel.findByEmail(emailRelated)
  
  // If user doesn't exist, 
  // finish password validation returning true
  if (!user) return true

  // Get hashed password and compare
  const hashedPassword = user.password
  const match = await bcrypt.compare(password, hashedPassword)

  return match
}

export { 
  getInnerErrors,
  validate,
  emailExists, 
  isPasswordCorrect,
  isObjectEmpty
}