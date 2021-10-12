import FileTag from '../FileTag'
import { FaFilePdf, FaEllipsisV } from 'react-icons/fa'

import style from './style.module.css'

const FileBox = ({ filename, tagName, fileSize }) => {
  return (
    <article className={style.fileBox}>
      <div className={style.fileBoxHeader}>

        <span className={style.wrapperOptions}>
          <FaEllipsisV className={style.options}/>
        </span>
      </div>

      
      <div className={style.fileBoxBody}>
        <FaFilePdf className={style.fileIcon} />
        <h3 className={style.fileTitle}>
          {filename}
        </h3>
      </div>

      <div className={style.divider}></div>

      <div className={style.info}>
        <div className={style.fileSize}>
          <header>Size</header>
          <div className={style.size}>{fileSize}</div>
        </div>

        <FileTag tagName={tagName} />
      </div>
    </article>
  )
}

export default FileBox