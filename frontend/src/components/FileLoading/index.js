import { FaFilePdf, FaTimes } from 'react-icons/fa'

import style from './style.module.css'

const FileLoading = () => {
  return (
    <article className={style.fileLoading}>
      <FaFilePdf className={style.fileIcon} />

      <div className={style.wrapper}>
        <div className={style.info}>
          <h3 className={style.filename}>Matemática 1.pdf</h3>
          
          <span className={style.fileSize}>10mb</span>

          <FaTimes className={style.closeIcon} />
        </div>

        <div className={style.loadingBar}>
          <div className={style.loadingBarInner}></div>
        </div>
      </div>
    </article>
  )
}

export default FileLoading