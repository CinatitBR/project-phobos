import * as yup from 'yup'
import { emailExists } from '../utils/helper.js'

const email = () => yup
  .string()
  .email()
  .required()
  .test(
    'email-exists',
    'This email already exists',
    async email => !(await emailExists(email))
  )

const username = () => yup.string().trim().max(255).required()
const password = () => yup.string().max(255).required()

const registerValidation = { email, username, password }
export default registerValidation
