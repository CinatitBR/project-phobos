import { useState } from 'react'
import { openFile } from '../../apis/viewSDKClient'
import classNames from 'classnames'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import FileTag from '../FileTag'
import Dropdown from '../../components/Dropdown'
import { FaFilePdf, FaEllipsisV, FaExternalLinkAlt, FaArrowDown, FaTrashAlt, FaLink } from 'react-icons/fa'
import { LinkIcon } from '../Buttons'

import style from './style.module.css'

const FileBox = ({ file, onFileClick, onFileDelete }) => {
  const [showOptions, setShowOptions] = useState(false)
  const { id, title, fileUrl, size, tag_name } = file
  const userId = useAuth().user.id

  let dropdownItems = [
    {
      id: 0,
      leftIcon: <FaExternalLinkAlt />,
      text: 'Open',
      onClick: () => openFile(title, fileUrl)
    },
    {
      id: 1,
      leftIcon: <FaArrowDown />,
      text: 'Download',
      onClick: () => window.open(fileUrl, '_blank')
    },
    {
      id: 2,
      leftIcon: <FaTrashAlt />,
      text: 'Delete',
      onClick: async () => {
        onFileDelete(file.id)
        await authAPI.destroy(id)
      }
    }
  ]

  // If file is shared, remove delete button
  if (userId !== file.user_id) 
    dropdownItems.pop()

  return (
    <article 
      className={style.fileBox}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => onFileClick(file)}
    >
      <header className={style.fileBoxHeader}>
        {(userId !== file.user_id) && 
          <LinkIcon />
        }

        <Dropdown
          items={dropdownItems}
          margin={5}
        > 
          <span className={classNames(
            style.wrapperOptions,
            {[style.hide]: !showOptions}
          )}>
            <FaEllipsisV className={style.options}/>
          </span>
        </Dropdown>
      </header>

      
      <div className={style.fileBoxBody}>
        <FaFilePdf className={style.fileIcon} />
        <h3 className={style.fileTitle}>
          {title}
        </h3>
      </div>

      <footer>
        <div className={style.info}>
          <div className={style.fileSize}>
            <header>Size</header>
            <div className={style.size}>{size}</div>
          </div>

          <FileTag>
            {tag_name}
          </FileTag>
        </div>
      </footer>
    </article>
  )
}

export default FileBox