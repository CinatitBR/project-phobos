import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { FaFilePdf } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import FormField from '../FormField'
import Select from '../Select'
import { Button } from '../Buttons'
import FileTag from '../FileTag'
import { ChevronIcon, CloseIcon } from '../Buttons'

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
  const [selectItems, setSelectItems] = useState([])
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const collapseEle = useRef(null)
  const user = useAuth().user

  const [newTagName, setNewTagName] = useState(null)
  const [existingTagId, setExistingTagId] = useState(null)
  const [tagName, setTagName] = useState(null)
  const [isPublic, setIsPublic] = useState(false)

  const handleUpload = () => {
    console.log(isPublic)

    onFileUpload({ 
      id, 
      newTagName: newTagName ? newTagName : null, // If newTagName is an empty string, will set it to null
      existingTagId,
      isPublic 
    })

    setIsCollapseOpen(false)
  }

  // Get pdf tags
  useEffect(() => { 
    const getTags = async () => {
      const response = await authAPI.findAllTag(user.id)
      const tags = response.data

      const items = tags.map(tag => ({
        text: tag.tag_name,
        id: tag.id,
      }))

      setSelectItems(items)
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
        <ChevronIcon 
          onClick={() => setIsCollapseOpen(!isCollapseOpen)} 
          isOpen={isCollapseOpen}
        />

        {uploaded &&
          <CloseIcon 
            onClick={() => onFileDelete(id)}
          />
        }
      </div>

      <div className={style.body}>
        <FaFilePdf className={style.fileIcon} />

        <div className={style.content}>
          <div className={style.info}>
            <h3 className={style.filename}>{filename}</h3>
            <span className={style.fileSize}>{size} MB</span>

            {(newTagName || existingTagId) &&
              <FileTag style={{ marginLeft: 'auto' }}>
                {newTagName ? 
                  newTagName : 
                  tagName
                }
              </FileTag>
            }
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
          <label className={style.switch}>
            <input 
              type="checkbox" 
              onClick={e => setIsPublic(e.target.checked)} 
            />
            <span className={style.slider}></span>

            <span className={classNames(style.value, style.off)}>Private</span>
            <span className={classNames(style.value, style.on)}>Public</span>
          </label>

          <FormField 
            label="Add new tag"
            disabled={existingTagId}
            onChange={e => setNewTagName(e.target.value)}
          />

          <span className={style.text}>Or</span>
          
          <Select
            label="Select existing tag"
            items={selectItems}
            disabled={newTagName}
            onSelect={item => {
              setExistingTagId(item.id)
              setTagName(item.text)
            }}
          />

          <Button 
            fullWidth 
            style={{ marginTop: '15px' }}
            disabled={!(existingTagId || newTagName)}
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