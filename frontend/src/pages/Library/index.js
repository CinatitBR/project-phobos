import { useEffect, useState } from 'react'
import FilePreviewSidebar from '../../components/FilePreviewSidebar'
import FileList from '../../components/FileList'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'

import style from './style.module.css'

const Library = () => {
  const userId = useAuth().user.id
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div className={style.library}>
      <section className={style.content}>
        {loading ? 
          'Carregando...' :
          <FileList files={files} onFileClick={handleFileClick} />
        }
      </section>

      <FilePreviewSidebar 
        file={selectedFile}
      />
    </div>
  )
}

export default Library