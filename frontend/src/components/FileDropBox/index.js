import Button from '../Button'
import { FaUpload } from 'react-icons/fa'
import authAPI from '../../apis/authAPI'
import useAuth from '../../hooks/useAuth'

import style from './style.module.css'

const FileDropBox = ({ onFileUpload, onProgressChange }) => {
  const auth = useAuth()
  const userId = auth.user.id
  
  const handleFileUpload = async e => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault()

    // Check if item is a file
    if (e.dataTransfer.items[0].kind !== 'file') {
      console.log('This is not a file')
      return
    }

    const file = e.dataTransfer.items[0].getAsFile()

    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      console.log('This is not a PDF')
      return
    }

    // Set file state
    onFileUpload(file)

    // Create formData to send to server
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('pdf', file)

    // Upload file to server
    try {
      await authAPI.uploadFile(formData, onProgressChange)
      console.log('upload successful')
    }
    catch (errors) {
      console.log('upload error')
    }
  }

  const handleDragOver = e => {
    // Prevent default bevahior (Prevent resetting the current drag operation to "none")
    e.preventDefault()
  }

  return (
    <div 
      className={style.fileDropBox} 
      onDrop={handleFileUpload} 
      onDragOver={handleDragOver}
    >
      <FaUpload size="100px" className={style.uploadIcon} />

      <div className={style.suggestion}>
        <p>Drag to upoload</p>

        <span className={style.pseudo}>
          <span className={style.content}>or select a file</span>
        </span>
      </div>

      <Button>Select file</Button>
    </div>
  )
}

export default FileDropBox