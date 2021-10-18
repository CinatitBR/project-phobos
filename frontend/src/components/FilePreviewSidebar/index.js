import FileTag from '../FileTag'
import { FaFileAlt, FaFilePdf, FaArrowDown, FaTrashAlt } from 'react-icons/fa'

import style from './style.module.css'

const FilePreviewSidebar = () => {

  return (
    <div className={style.filePreviewSidebar}>
      <div className={style.title}>
        <FaFileAlt /> File Preview
      </div>

      <div className={style.divider}></div>

      <div className={style.fileInfo}>
        <FaFilePdf className={style.fileIcon} />
        <h2 className={style.filename}>Probabilidade.pdf</h2>

        <div className={style.footer}>
          <div className={style.fileSize}>
            <header>Size</header>
            <span className={style.size}>10 MB</span>
          </div>

          <FileTag>Matemática</FileTag>
        </div>
      </div>

      <div className={style.divider} style={{ margin: ' 0-20px' }}></div>

      <div className={style.buttonList}>

        <div className={style.button}>
          <span className={style.backgroundIcon}>
            <FaArrowDown className={style.icon} />
          </span>

          <span className={style.buttonName}>Open</span>
        </div>

        <div className={style.button}>
          <span className={style.backgroundIcon}>
            <FaTrashAlt className={style.icon} />
          </span>

          <span className={style.buttonName}>Delete</span>
        </div>

        <div className={style.button}>
          <span className={style.backgroundIcon}>
            <FaArrowDown className={style.icon} />
          </span>

          <span className={style.buttonName}>Download</span>
        </div>

      </div>

    </div>
  )
}

export default FilePreviewSidebar