import * as yup from 'yup'
import { handleValidationError, emailExists, isPasswordCorrect } from '../helper.js'

const loginValidation = loginData => handleValidationError(
  yup.object({
    email: yup
      .string()
      .email()
      .required()
      .test(
        'email-not-registered',
        'This email has not been registered yet',
        async email => await emailExists(email)
      ),

    password: yup
      .string()
      .required()
      .test(
        'check-password',
        'The password is incorrect',
        async (password, context) => await isPasswordCorrect(password, context.parent.email)
      )
  })
    .validate(loginData, { abortEarly: false })
)

export default loginValidation