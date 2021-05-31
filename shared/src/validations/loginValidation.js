import * as yup from 'yup'
import { emailExists, isPasswordCorrect } from '../utils/helper.js'

const email = email => yup
  .string()
  .email()
  .required()
  .test(
    'email-not-registered',
    'This email has not been registered yet',
    async email => await emailExists(email)
  )
  .validate(email)

const password = (email, password) => yup
  .string()
  .required()
  .test(
    'check-password',
    'The password is incorrect',
    async password => await isPasswordCorrect(password, email)
  )
  .validate(password)

const loginValidation = { email, password }
export default loginValidation