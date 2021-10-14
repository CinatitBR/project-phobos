import { useEffect, useState } from 'react'
import FilePreviewSidebar from '../../components/FilePreviewSidebar'
import FileList from '../../components/FileList'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'

import style from './style.module.css'

// const files = [
//   {
//     id: 1,
//     filename: 'Probabilidade.pdf',
//     tagName: 'Matemática',
//     size: '10 MB',
//   },
//   {
//     id: 2,
//     filename: 'Friends Script.pdf',
//     tagName: 'TV Show',
//     size: '16 MB',
//   },
//   {
//     id: 3,
//     filename: 'Biggie smalls.pdf',
//     tagName: 'Rap',
//     size: '5 MB',
//   }
// ]

const Explore = () => {
  const userId = useAuth().user.id
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFiles = async () => {
      const response = await authAPI.findAll(userId)

      setFiles(response.data.files)
      setLoading(false)
    }

    getFiles()
  }, [userId])

  return (
    <div className={style.explore}>
      <section className={style.content}>
        {loading ? 
          'Carregando...' :
          <FileList files={files} />
        }
      </section>

      <FilePreviewSidebar />
    </div>
  )
}

export default Explore