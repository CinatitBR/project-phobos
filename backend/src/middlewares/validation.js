import registerValidation from '../../../shared/src/validations/registerValidation.js'
import loginValidation from '../../../shared/src/validations/loginValidation.js'

const isObjectEmpty = obj => {
  for (const [key, value] of Object.entries(obj)) {
    if (value) return false
  }

  return true
}

const register = async (req, res, next) => {
  const { email, username, password } = req.body
  const errors = {}

  errors.email = await registerValidation.email(email)
  errors.username = await registerValidation.username(username)
  errors.password = await registerValidation.password(password)

  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const errors = {}

  errors.email = await loginValidation.email(email)

  if (errors.email) {
    return res.status(400).json(errors)
  }

  errors.password = await loginValidation.password(email, password)

  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const validation = { register, login }
export default validation