import { useState, useEffect } from 'react'
import { FaFilePdf } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import FormField from '../FormField'
import Select from '../Select'
import FileTag from '../FileTag'
import { Button, CloseIcon, ToggleSwitch } from '../Buttons'
import Collapse from '../Collapse'

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
  const user = useAuth().user
  const [selectItems, setSelectItems] = useState([])
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const [newTagName, setNewTagName] = useState(null)
  const [existingTagId, setExistingTagId] = useState(null)
  const [tagName, setTagName] = useState(null)
  const [isPublic, setIsPublic] = useState(false)

  const handleUpload = () => {
    onFileUpload({ 
      id, 
      newTagName: newTagName ? newTagName : null, // If newTagName is an empty string, will set it to null
      existingTagId,
      isPublic 
    })

    setIsCollapseOpen(false)
  }

  // Open collapse when file is not uploaded
  useEffect(() => {
    if (!uploaded) setIsCollapseOpen(true)
  }, [uploaded])

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
  
  return (
    <article className={style.fileLoading}>
      <div className={style.header}>
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
            <span className={style.fileSize}>{size}</span>

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

      <Collapse 
        open={isCollapseOpen}
        background="var(--primary-blue)"
      >
        <div className={style.collapseContent}>
          <ToggleSwitch onClick={e => setIsPublic(e.target.checked)} />

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
      </Collapse>
    </article>
  )
}

export default FileLoading