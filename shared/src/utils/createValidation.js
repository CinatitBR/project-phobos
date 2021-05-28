const getInnerErrors = (validationError) => {
  const errors = {}

  for (const error of validationError.inner) {
    const { path: field, message } = error

    errors[field] = message
  }

  return errors
}

const createValidation = (schema) => ({
  validateAll: async (data) => {
    try {
      await schema.validate(data, {abortEarly: false})

      return null
    }
    catch(validationError) {
      const errors = getInnerErrors(validationError)

      return errors
    }
  }
})

export default createValidation