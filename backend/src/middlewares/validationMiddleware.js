const validation = (schema) => async (req, res, next) => {
  const data = req.body

  try {
    await schema.validate(data, { abortEarly: false })

    return next()
  }
  catch (error) {
    const errors = error.inner

    const fieldErrors = errors.map(error => {
      const { path: field, message } = error

      return {field, message}
    })

    return res.status(400).json(fieldErrors)
  }

}

export default validation