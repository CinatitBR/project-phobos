import * as yup from 'yup'

const registerSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().trim().max(255).required(),
  password: yup.string().trim().max(255).required()
})

export default registerSchema