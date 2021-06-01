import express from 'express'

import upload from './middlewares/upload.js'
import validation from './middlewares/validation.js'

import pdfController from './controllers/pdfController.js'
import authController from './controllers/authController.js'
import userController from './controllers/userController.js'

const router = express.Router()

router.post('/user/find-by-email', userController.findByEmail)

router.post('/pdf/upload', upload('pdf'), pdfController.upload)

router.post('/auth/register', validation.register, authController.register)
router.post('/auth/login', validation.login, authController.login)
router.get('/auth/logout', authController.logout)
router.get('/auth/refresh-token', authController.refreshToken)

export default router