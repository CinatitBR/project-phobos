import FileTag from '../FileTag'
import { FaFileAlt, FaFilePdf, FaArrowDown, FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'

import style from './style.module.css'

const FileInfo = ({ title, size, tag }) => (
  <div className={style.fileInfo}>
    <FaFilePdf className={style.fileIcon} />
    <h2 className={style.filename}>{title}</h2>

    <div className={style.footer}>
      <div className={style.fileSize}>
        <header>Size</header>
        <span className={style.size}>{size} MB</span>
      </div>

      <FileTag>{tag}</FileTag>
    </div>
  </div>
)

const ButtonList = () => (
  <div className={style.buttonList}>
    <div className={style.item}>
      <span className={style.backgroundIcon}>
        <FaExternalLinkAlt className={style.icon} />
      </span>

      <span className={style.buttonName}>Open</span>
    </div>

    <div className={style.item}>
      <span className={style.backgroundIcon}>
        <FaTrashAlt className={style.icon} />
      </span>

      <span className={style.buttonName}>Delete</span>
    </div>

    <div className={style.item}>
      <span className={style.backgroundIcon}>
        <FaArrowDown className={style.icon} />
      </span>

      <span className={style.buttonName}>Download</span>
    </div>
  </div>
)

const FilePreviewSidebar = () => {
  return (
    <div className={style.filePreviewSidebar}>
      <div className={style.title}>
        <FaFileAlt /> File Preview
      </div>

      <div className={style.divider}></div>

      <FileInfo 
        title="Probabilidade.pdf"
        tag="Matemática"
        size="10"
      />

      <div className={style.divider} style={{ margin: ' 0-20px' }}></div>

      <ButtonList />
    </div>
  )
}

export default FilePreviewSidebar