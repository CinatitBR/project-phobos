import registerValidation from '../../../shared/src/validations/registerValidation.js'
import loginValidation from '../../../shared/src/validations/loginValidation.js'

const isEmpty = obj => Object.entries(obj).length === 0

const register = async (req, res, next) => {
  const { email, username, password } = req.body
  const errors = {}

  try {
    await registerValidation.email().validate(email)
  } 
  catch (validationError) {
    const { message } = validationError
    errors.email = message
  }

  try {
    await registerValidation.username().validate(username)
  } 
  catch (validationError) {
    const { message } = validationError
    errors.username = message
  }

  try {
    await registerValidation.username().validate(password)
  } 
  catch (validationError) {
    const { message } = validationError
    errors.password = message
  }

  if (!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const errors = {}

  try {
    await loginValidation.email(email)
  } 
  catch (validationError) {
    const { message } = validationError
    errors.email = message

    return res.status(400).json(errors)
  }

  try {
    await loginValidation.password(email, password)
  } 
  catch (validationError) {
    const { message } = validationError
    errors.username = message
  }

  if (!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const validation = { register, login }
export default validation