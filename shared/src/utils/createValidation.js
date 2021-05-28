import * as yup from 'yup'

const getInnerErrors = (validationError) => {
  const errors = {}

  for (const error of validationError.inner) {
    const { path: field, message } = error

    errors[field] = message
  }

  return errors
}

const createValidation = (schema) => ({
  validateAll: async (value) => {
    try {
      await schema.validate(value, {abortEarly: false})

      return null
    }
    catch(validationError) {
      const errors = getInnerErrors(validationError)

      return errors
    }
  },
  validateOne: async (field, value) => {
    try {
      await yup.reach(schema, field).validate(value)

      return null
    }
    catch(validationError) {
      const { message } = validationError
      const error = {[field]: message}

      return error
    }
  }
})

export default createValidation