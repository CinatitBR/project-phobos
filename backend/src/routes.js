import express from 'express'

import upload from './middlewares/upload.js'
import validation from './middlewares/validation.js'

import pdfController from './controllers/pdfController.js'
import authController from './controllers/authController.js'
import userController from './controllers/userController.js'

const router = express.Router()

router.post('/user/find-by-email', userController.findByEmail)

router.post('/pdf/find-all', pdfController.findAll)
router.get('/pdf/find-public', pdfController.findPublic)
router.post('/pdf/upload', upload('pdf'), pdfController.upload)
router.post('/pdf/search', pdfController.search)
router.post('/pdf/delete', pdfController.destroy)
router.post('/pdf/find-all-tag', pdfController.findAllTag)
router.post('/pdf/find-tag-by-id', pdfController.findTagById)
router.post('/pdf/stars', pdfController.stars)
router.post('/pdf/add-to-library', pdfController.addToLibrary)
router.post('/pdf/remove-from-library', pdfController.removeFromLibrary)

router.post('/auth/register', validation.register, authController.register)
router.post('/auth/login', validation.login, authController.login)
router.get('/auth/logout', authController.logout)
router.get('/auth/refresh-token', authController.refreshToken)

export default router