import * as yup from 'yup'
import { handleValidationError, emailExists } from './helper.js'

const registerValidation = registerData => handleValidationError(
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
    .validate(registerData, { abortEarly: false })
) 

export default registerValidation
