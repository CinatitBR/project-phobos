import registerValidation from '../validations/registerValidation.js'
import loginValidation from '../validations/loginValidation.js'

const isObjectEmpty = obj => {
  for (const value of Object.values(obj)) {
    if (value) return false
  }

  return true
}

const register = async (req, res, next) => {
  const { email, username, password } = req.body

  // Get errors
  const errors = await registerValidation({email, username, password})

  // Check if there are errors
  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  // Get errors
  const errors = await loginValidation({email, password})

  // Check if there are errors
  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const validation = { register, login }
export default validation