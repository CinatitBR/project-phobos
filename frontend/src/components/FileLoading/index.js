import { useState, useRef, useEffect } from 'react'
import { FaFilePdf, FaTimes, FaChevronUp } from 'react-icons/fa'
import FormField from '../FormField'
import Select from '../Select'

import style from './style.module.css'

const FileLoading = ({ id, filename, size, uploaded, progress, onFileDelete }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const collapseEle = useRef(null)

  const selectItems = [
    {
      text: 'Olá',
    },
    {
      text: 'Mano tudo bem com você',
    },
    {
      text: 'Com certeza deus'
    }
  ]

  // Handle Collapse opening and closing
  useEffect(() => {
    // Check if ref is null
    if (!collapseEle) return null

    const { scrollHeight } = collapseEle.current

    if (isCollapseOpen) {
      collapseEle.current.style.maxHeight = `${scrollHeight + 30}px`
      collapseEle.current.style.padding = '15px'
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
            
            <span className={style.fileSize}>{size} mb</span>
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
            items={selectItems}
          />
        </div>
      </section>
    </article>
  )
}

export default FileLoading