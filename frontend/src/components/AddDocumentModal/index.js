import { useState, useEffect } from 'react'
import Modal from '../Modal'
import FileDropBox from '../FileDropBox'
import FileLoading from '../FileLoading'
import authAPI from '../../apis/authAPI'
import useAuth from '../../hooks/useAuth'
import {v4 as uuidv4} from 'uuid'

import style from './style.module.css'

const AddDocumentModal = ({ show, onClose }) => {
  const auth = useAuth()
  const userId = auth.user.id
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Clear uploadedFiles on modal close
  useEffect(() => {
    if (!show) setUploadedFiles([])
  }, [show])

  // Update file in uploadedFiles
  const updateFile = (id, fileData) => {
    setUploadedFiles(state => (
      state?.map(file => file.id === id ? {...file, ...fileData} : file )
    ))
  }

  const handleUpload = files => {
    // Create array with new uploaded files
    const newUploadedFiles = files.map(file => ({
      file: file,
      id: uuidv4(),
      filename: file.name,
      size: file.size,
      progress: 0,
      uploaded: false,
      error: false
    }))

    // Update uploadedFiles
    setUploadedFiles(state => state?.concat(newUploadedFiles))

    // Upload new files to the server
    newUploadedFiles.forEach(processUpload)
  }

  // Upload file to server and update progress
  const processUpload = async uploadedFile => {
    const { id } = uploadedFile

    // Prepare data to send to server
    const data = new FormData()
    data.append('userId', userId)
    data.append('pdf', uploadedFile.file)

    // Upload file to server
    try {
      const updateProgress = progress => updateFile(id, {progress})

      await authAPI.uploadFile(data, updateProgress)
      updateFile(id, { uploaded: true })
      console.log('upload successful')
    }
    catch (errors) {
      updateFile(id, { error: true })
      console.log('upload error')
    }
  }

  return (
    <Modal className={style.addDocumentModal} title="Upload document" show={show} onClose={onClose}>
      <div className={style.wrapper}>
        <FileDropBox onFileUpload={handleUpload} />

        <div className={style.fileLoadingList}>
          {uploadedFiles?.map(uploadedFile => (
            <FileLoading 
              filename={uploadedFile.filename} 
              size={Math.round((uploadedFile.size / 10**6) * 100) / 100} 
              uploaded={uploadedFile.uploaded}
              progress={uploadedFile.progress} 
              key={uploadedFile.id}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AddDocumentModal