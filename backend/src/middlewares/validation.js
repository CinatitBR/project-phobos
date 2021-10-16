import * as yup from 'yup'
import { 
  validate, 
  emailExists, 
  isPasswordCorrect,
  isObjectEmpty
} from '../utils/helper.js'

const loginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .test({
      name: 'email-not-registered',
      message: 'This email has not been registered yet',
      test: async email => await emailExists(email)
    }),

  password: yup
    .string()
    .required()
    .test({
      name: 'check-password',
      message: 'The password is incorrect',
      test: async (password, context) => await 
        isPasswordCorrect(password, context.parent.email)
    })
})

const registerSchema = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .test(
      'email-exists',
      'This email already exists',
      async email => !(await emailExists(email))
    ),

  username: yup
    .string()
    .trim()
    .max(255)
    .required(),

  password: yup
    .string() 
    .max(255)
    .required()
})

const register = async (req, res, next) => {
  const { email, username, password } = req.body
  const data = {email, username, password}

  // Validate and get errors
  const errors = await validate(registerSchema, data)

  // Check if there are errors
  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const data = { email, password }

  // Validate and get errors
  const errors = await validate(loginSchema, data)

  // Check if there are errors
  if (!isObjectEmpty(errors)) {
    return res.status(400).json(errors)
  }

  return next()
}

const validation = {register, login}
export default validation