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

  // Handle file deleting
  const deleteFile = async id => {
    try {
      // Delete file from database
      await authAPI.destroy(id) 
      
      // Remove file from uploadedFiles
      setUploadedFiles(state => state.filter(file => file.id !== id) )
    }
    catch (error) {
      console.log('delete error')
    }
  }

  const handleFileDrop = files => {
    // Create array with new uploaded files
    const newUploadedFiles = files.map(file => ({
      file: file,
      id: uuidv4(),
      filename: file.name,
      size: file.size,
      progress: 0,
      uploaded: false,
      error: false,
      newTagName: null, 
      existingTagId: null,
      isPublic: false
    }))

    // Update uploadedFiles
    setUploadedFiles(state => state?.concat(newUploadedFiles))
  }

  const handleFileUpload = ({ id, newTagName, existingTagId, isPublic }) => {
    const updatedFileData = {newTagName, existingTagId, isPublic}

    // Update file data
    updateFile(id, updatedFileData)

    // Get updated file object
    const oldFile = uploadedFiles.find(file => file.id === id)
    const updatedFile = {...oldFile, ...updatedFileData}

    // Upload file to server
    uploadFile(updatedFile)
  }

  // Upload file to server and update loading progress
  const uploadFile = async uploadedFile => {
    const { id, existingTagId, newTagName, file, isPublic } = uploadedFile
    
    // Prepare data to send to server
    const data = new FormData()
    data.append('userId', userId)
    data.append('isPublic', isPublic)
    data.append('pdf', file)

    // Only append data that exists
    if (existingTagId) data.append('existingTagId', existingTagId)
    if (newTagName) data.append('newTagName', newTagName)

    // Upload file to server
    try {
      const updateProgress = progress => updateFile(id, { progress })

      const response = await authAPI.uploadFile(data, updateProgress)
      const { pdfId } = response.data

      updateFile(id, { uploaded: true, id: pdfId })
    }
    catch (errors) {
      updateFile(id, { error: true })
      console.log('upload error')
    }
  }

  return (
    <Modal className={style.addDocumentModal} title="Upload document" show={show} onClose={onClose}>
      <div className={style.wrapper}>
        <FileDropBox onFileDrop={handleFileDrop} />

        <div className={style.fileLoadingList}>
          {uploadedFiles?.map(uploadedFile => (
            <FileLoading 
              key={uploadedFile.id}
              filename={uploadedFile.filename} 
              size={Math.round((uploadedFile.size / 10**6) * 100) / 100} 
              uploaded={uploadedFile.uploaded}
              progress={uploadedFile.progress} 
              id={uploadedFile.id}
              onFileDelete={deleteFile}
              onFileUpload={handleFileUpload}
            />
          ))}

          <FileLoading 
            key={1}
            filename="Matemática"
            size={35}
            uploaded={true}
            progress={100}
            id={1}
            onFileDelete={deleteFile}
            onFileUpload={handleFileUpload}
          />

        </div>
      </div>
    </Modal>
  )
}

export default AddDocumentModal