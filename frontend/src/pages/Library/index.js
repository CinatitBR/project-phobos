import { useEffect, useState, useRef } from 'react'
import FilePreviewSidebar from '../../components/FilePreviewSidebar'
import FileList from '../../components/FileList'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import Snackbar from '../../components/Snackbar'
import planet2 from '../../assets/planet-2.svg'

import style from './style.module.css'

const Library = () => {
  const userId = useAuth().user.id
  
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const snackbarRef = useRef(null) 

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

    // Close snackbar
    setTimeout(() => snackbarRef.current.close(), 2000)
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
        icon={<img src={planet2} alt="Planet loading" className={style.loadingIcon} />}
        text="Deleting file..."
      /> 
    </div>
  )
}

export default Library