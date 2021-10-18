import { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import { FaFilePdf, FaTimes, FaChevronUp } from 'react-icons/fa'
import FormField from '../FormField'
import Select from '../Select'
import Button from '../Button'
import FileTag from '../FileTag'

import style from './style.module.css'

const FileLoading = ({ 
  id, 
  filename, 
  size, 
  uploaded, 
  progress, 
  onFileDelete,
  onFileUpload
}) => {
  const [tagNames, setTagNames] = useState([])
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const collapseEle = useRef(null)
  const user = useAuth().user

  const handleUpload = () => {
    onFileUpload(id)
  }

  // Get pdf tags
  useEffect(() => { 
    const getTags = async () => {
      const response = await authAPI.findAllTag(user.id)
      const tags = response.data

      setTagNames(tags.map(tag => tag.tag_name))
    }

    getTags()
  }, [user])

  // Handle Collapse opening and closing
  useEffect(() => {
    // Check if ref is null
    if (!collapseEle) return null

    if (isCollapseOpen) {
      collapseEle.current.style.padding = '15px'

      const { scrollHeight } = collapseEle.current
      collapseEle.current.style.maxHeight = `${scrollHeight}px`
    } 
    else {
      collapseEle.current.style.maxHeight = '0'
      collapseEle.current.style.padding = '0'
    }

  }, [isCollapseOpen])
  
  return (
    <article className={style.fileLoading}>
      <div className={style.header}>
        <span 
          className={`${style.iconWrapper} ${style.collapseIcon}`}
          onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        >
          <FaChevronUp className={`${style.collapseIcon} ${style.icon}`} />
        </span>

        {uploaded &&
          <span className={`${style.iconWrapper} ${style.close}`}>
            <FaTimes 
              className={`${style.closeIcon} ${style.icon}`} 
              onClick={() => onFileDelete(id)} 
            />
          </span>
        }
      </div>

      <div className={style.body}>
        <FaFilePdf className={style.fileIcon} />

        <div className={style.content}>
          <div className={style.info}>
            <h3 className={style.filename}>{filename}</h3>
            <span className={style.fileSize}>{size} MB</span>

            <FileTag style={{ marginLeft: 'auto' }}>
              Matemática aplicada
            </FileTag>
          </div>

          <div className={style.progressBar}>
            <div className={style.progressBarInner} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      
      <section 
        className={style.collapseWrapper}
        ref={collapseEle}
      >
        <div className={style.content}>
          <FormField 
            label="Add new tag"
          />

          <span className={style.text}>Or</span>
          
          <Select
            label="Select existing tag"
            items={tagNames}
          />

          <Button 
            fullWidth 
            style={{ marginTop: '15px' }}
            onClick={handleUpload}
          >
            Upload file
          </Button>
        </div>
      </section>
    </article>
  )
}

export default FileLoading