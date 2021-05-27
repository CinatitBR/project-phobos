const validation = (schema) => async (req, res, next) => {
  const data = req.body

  try {
    await schema.validate(data)

    return next()
  }
  catch (error) {
    const errorMessage = error.message

    return res.status(400).json({ errorMessage })
  }

}

export default validation