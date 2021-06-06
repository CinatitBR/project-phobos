import * as yup from 'yup'
import { handleValidationError, emailExists, isPasswordCorrect } from '../helper.js'

const loginValidation = loginData => handleValidationError(
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
    .validate(loginData, { abortEarly: false })
)

export default loginValidation