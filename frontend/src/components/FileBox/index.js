import { useState } from 'react'
import FileTag from '../FileTag'
import Dropdown from '../../components/Dropdown'
import { FaFilePdf, FaEllipsisV, FaExternalLinkAlt, FaArrowDown, FaTrashAlt } from 'react-icons/fa'
import classNames from 'classnames'

import style from './style.module.css'

const FileBox = ({ id, filename, tagName, fileSize, onFileClick }) => {
  const [showOptions, setShowOptions] = useState(false)

  const dropdownItems = [
    {
      leftIcon: <FaExternalLinkAlt />,
      text: 'Open'
    },
    {
      leftIcon: <FaArrowDown />,
      text: 'Download'
    },
    {
      leftIcon: <FaTrashAlt />,
      text: 'Delete'
    }
  ]

  return (
    <article 
      className={style.fileBox}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => onFileClick({ filename, tagName, fileSize })}
    >
      <header 
        className={classNames(
          style.fileBoxHeader, 
          {[style.hide]: !showOptions}
        )}
      >
        <Dropdown
          items={dropdownItems}
          margin={5}
        > 
          <span className={style.wrapperOptions}>
            <FaEllipsisV className={style.options}/>
          </span>
        </Dropdown>
      </header>

      
      <div className={style.fileBoxBody}>
        <FaFilePdf className={style.fileIcon} />
        <h3 className={style.fileTitle}>
          {filename}
        </h3>
      </div>

      <footer>
        <div className={style.info}>
          <div className={style.fileSize}>
            <header>Size</header>
            <div className={style.size}>{fileSize}</div>
          </div>

          <FileTag>
            {tagName}
          </FileTag>
        </div>
      </footer>
    </article>
  )
}

export default FileBox