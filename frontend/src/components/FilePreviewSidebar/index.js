import FileTag from '../FileTag'
import { openFile } from '../../apis/viewSDKClient'
import { FaFileAlt, FaFilePdf, FaArrowDown, FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'

import style from './style.module.css'

const FileInfo = ({ filename, size, tag }) => (
  <div className={style.fileInfo}>
    <FaFilePdf className={style.fileIcon} />
    <h2 className={style.filename}>{filename}</h2>

    <div className={style.footer}>
      <div className={style.fileSize}>
        <header>Size</header>
        <span className={style.size}>{size} MB</span>
      </div>

      <FileTag>{tag}</FileTag>
    </div>
  </div>
)

const ButtonList = ({ file, onFileDelete }) => {
  return (
    <div className={style.buttonList}>
      <div 
        className={style.item} 
        onClick={() => openFile(file.title, file.fileUrl)}
      >
        <span className={style.backgroundIcon}>
          <FaExternalLinkAlt className={style.icon} />
        </span>

        <span className={style.buttonName}>Open</span>
      </div>

      <div 
        className={style.item} 
        onClick={() => onFileDelete(file.id)}
      >
        <span className={style.backgroundIcon}>
          <FaTrashAlt className={style.icon} />
        </span>

        <span className={style.buttonName}>Delete</span>
      </div>

      <div className={style.item} onClick={() => window.open(file.fileUrl, '_blank')}>
        <span className={style.backgroundIcon}>
          <FaArrowDown className={style.icon} />
        </span>

        <span className={style.buttonName}>Download</span>
      </div>
    </div>
  )
}

const FilePreviewSidebar = ({ file = null, onFileDelete }) => {
  return (
    <div className={style.filePreviewSidebar}>
      <div className={style.title}>
        <FaFileAlt /> File Preview
      </div>

      <div className={style.divider}></div>

      {!file && <p className={style.tip}>Click on a file to see its info</p>}

      {file &&
        <> 
        <FileInfo 
          filename={file.title}
          tag={file.tag_name}
          size={file.size}
        />

        <div className={style.divider} style={{ margin: ' 0-20px' }}></div>

        <ButtonList file={file} onFileDelete={onFileDelete} />
        </>
      }
    </div>
  )
}

export default FilePreviewSidebar