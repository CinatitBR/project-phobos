import { useEffect, useState, useRef } from 'react'
import FilePreviewSidebar from '../../components/FilePreviewSidebar'
import FileList from '../../components/FileList'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import { FaCheck } from 'react-icons/fa'
import Snackbar from '../../components/Snackbar'
import planet2 from '../../assets/planet-2.svg'

import style from './style.module.css'

const Library = () => {
  const userId = useAuth().user.id
  
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const snackbarRef = useRef(null) 
  const successSnackbarRef = useRef(null)

  useEffect(() => {
    const getFiles = async () => {
      const response = await authAPI.findAll(userId)
  
      setFiles(response.data)
      setLoading(false)
    }

    getFiles()
  }, [userId])
  
  const handleFileClick = (file) => {
    setSelectedFile(file)
  }

  // Delete file
  const deleteFile = async (id) => {
    // Open snackbar
    snackbarRef.current.show()

    // Remove file data from selectedFile
    setSelectedFile(null)

    // Delete file on backend
    await authAPI.destroy(id)

    // Remove file from local state
    setFiles(files => files.filter(file => file.id !== id))

    // Close loading snackbar
    setTimeout(() => snackbarRef.current.close(), 2000)

    // Show success snackbar
    setTimeout(() => successSnackbarRef.current.show(), 2500)
  }

  return (
    <div className={style.library}>
      <section className={style.content}>
        {loading ? 
          'Carregando...' :
          <FileList 
            files={files} 
            onFileClick={handleFileClick} 
            onFileDelete={deleteFile}
          />
        }
      </section>

      <FilePreviewSidebar 
        file={selectedFile}
        onFileDelete={deleteFile}
      />

      {/* Loading snackbar */}
      <Snackbar 
        ref={snackbarRef}
        icon={<img src={planet2} alt="Planet loading" className={style.loadingIcon} width="35px" />}
        text="Deleting file..."
      /> 

      {/* File deleted snackbar */}
      <Snackbar 
        ref={successSnackbarRef}
        icon={<FaCheck size="30" />}
        count={4000}
        text="File deleted."
        buttons={[{ text: 'Close', onClick: () => successSnackbarRef.current.close() }]}
      /> 
    </div>
  )
}

export default Library