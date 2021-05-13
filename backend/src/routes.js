import express from 'express'
import handleUpload from './middlewares/handleUpload.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello')
})

router.post('/pdf/upload', handleUpload('pdf'), (req, res) => {
  res.json({message: 'ok'})
})

export default router