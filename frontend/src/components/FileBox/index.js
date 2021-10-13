import { useState } from 'react'
import FileTag from '../FileTag'
import Dropdown from '../../components/Dropdown'
import { FaFilePdf, FaEllipsisV } from 'react-icons/fa'
import classNames from 'classnames'

import style from './style.module.css'

const FileBox = ({ filename, tagName, fileSize }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <article 
      className={style.fileBox}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <header 
        className={classNames(
          style.fileBoxHeader, 
          {[style.hide]: !showOptions}
        )}
      >
        
        <Dropdown> 
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

      {/* <div className={style.divider}></div> */}

      <footer>
        <div className={style.divider}></div>
        
        <div className={style.info}>
          <div className={style.fileSize}>
            <header>Size</header>
            <div className={style.size}>{fileSize}</div>
          </div>

          <FileTag tagName={tagName} />
        </div>
      </footer>
    </article>
  )
}

export default FileBox