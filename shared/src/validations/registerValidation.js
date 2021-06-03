import * as yup from 'yup'
import { handleValidationError, emailExists } from '../helper.js'

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

// const email = email => handleValidationError(
//   yup
//     .string()
//     .email()
//     .required()
//     .test(
//       'email-exists',
//       'This email already exists',
//       async email => !(await emailExists(email))
//     )
//     .validate(email)
// )

// const username = username => handleValidationError(
//   yup
//     .string()
//     .trim()
//     .max(255)
//     .required()
//     .validate(username)
// )

// const password = password => handleValidationError(
//   yup
//     .string() 
//     .max(255)
//     .required()
//     .validate(password)
// )


// const registerValidation = { email, username, password }
export default registerValidation
