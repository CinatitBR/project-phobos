import express from 'express'

import handleUpload from './middlewares/handleUpload.js'
import validationMiddleware from './middlewares/validationMiddleware.js'
import checkCredentials from './middlewares/checkCredentials.js'

import pdfController from './controllers/pdfController.js'
import authController from './controllers/authController.js'
import userController from './controllers/userController.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/user/find-by-email', userController.findByEmail)

router.post('/pdf/upload', handleUpload('pdf'), pdfController.upload)

router.post('/auth/register', validationMiddleware({schema: 'register'}), authController.register)
router.post('/auth/login', checkCredentials, authController.login)
router.get('/auth/logout', authController.logout)
router.get('/auth/refresh-token', authController.refreshToken)

export default router