import { FaFilePdf, FaTimes } from 'react-icons/fa'

import style from './style.module.css'

const FileLoading = ({ filename, size, progress }) => {
  return (
    <article className={style.fileLoading}>
      <FaFilePdf className={style.fileIcon} />

      <div className={style.wrapper}>
        <div className={style.info}>
          <h3 className={style.filename}>{filename}</h3>
          
          <span className={style.fileSize}>{size} mb</span>

          <FaTimes className={style.closeIcon} />
        </div>

        <div className={style.progressBar}>
          <div className={style.progressBarInner} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </article>
  )
}

export default FileLoading