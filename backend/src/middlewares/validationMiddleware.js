const validation = (schema) => async (req, res, next) => {
  const data = req.body

  try {
    await schema.validate(data)

    return next()
  }
  catch (error) {
    const { path, message } = error
    const responseError = { field: path, message }

    return res.status(400).json(responseError)
  }

}

export default validation