import express from 'express'

import handleUpload from './middlewares/handleUpload.js'
import validationMiddleware from './middlewares/validationMiddleware.js'

import pdfController from './controllers/pdfController.js'
import authController from './controllers/authController.js'
import userController from './controllers/userController.js'

import registerSchema from '../../shared/src/validations/registerSchema.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/user/find-by-email', userController.findByEmail)
router.post('/pdf/upload', handleUpload('pdf'), pdfController.upload)
router.post('/auth/register', validationMiddleware(registerSchema), authController.register)

export default router