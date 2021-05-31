import * as yup from 'yup'
import { handleValidationError, emailExists } from '../utils/helper.js'

const email = email => handleValidationError(
  yup
    .string()
    .email()
    .required()
    .test(
      'email-exists',
      'This email already exists',
      async email => !(await emailExists(email))
    )
    .validate(email)
)

const username = username => handleValidationError(
  yup
    .string()
    .trim()
    .max(255)
    .required()
    .validate(username)
)

const password = password => handleValidationError(
  yup
    .string() 
    .max(255)
    .required()
    .validate(password)
)


const registerValidation = { email, username, password }
export default registerValidation
