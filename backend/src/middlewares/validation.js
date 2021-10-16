import * as yup from 'yup'
import { 
  getValidationErrors, 
  emailExists, 
  isPasswordCorrect,
  isObjectEmpty
} from '../utils/helper.js'

const loginValidation = data => getValidationErrors(
  yup.object({
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
    .validate(data, { abortEarly: false })
)

const registerValidation = data => getValidationErrors(
  yup.object({
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
    .validate(data, { abortEarly: false })
)

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

const validation = {register, login}
export default validation