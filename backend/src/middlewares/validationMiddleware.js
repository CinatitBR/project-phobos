import validate from '../../../shared/src/validate.js'

const validationMiddleware = ({schema}) => async (req, res, next) => {
  const data = req.body
  const schemaValidation = validate[schema]

  const errors = await schemaValidation.validateAll(data)

  if (errors) {
    return res.status(400).json(errors)
  }

  return next()
}

export default validationMiddleware