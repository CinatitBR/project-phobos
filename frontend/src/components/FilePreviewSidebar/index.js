import useAuth from '../../hooks/useAuth'
import FileTag from '../FileTag'
import { openFile } from '../../apis/viewSDKClient'
import { FaFileAlt, FaFilePdf, FaArrowDown, FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'

import style from './style.module.css'

const FileInfo = ({ file }) => (
  <div className={style.fileInfo}>
    <FaFilePdf className={style.fileIcon} />
    <h2 className={style.filename}>{file.title}</h2>

    <div className={style.footer}>
      <div className={style.fileSize}>
        <header>Size</header>
        <span className={style.size}>{Math.floor(file.size / 1000)} KB</span>
      </div>

      <FileTag>{file.tag_name}</FileTag>
    </div>
  </div>
)

const ButtonList = ({ file, onFileDelete }) => {
  const userId = useAuth().user.id

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

      {(userId === file.user_id) &&
        <div 
          className={style.item} 
          onClick={() => onFileDelete(file.id)}
        >
          <span className={style.backgroundIcon}>
            <FaTrashAlt className={style.icon} />
          </span>

          <span className={style.buttonName}>Delete</span>
        </div>
      }

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
          file={file}
        />

        <div className={style.divider} style={{ margin: ' 0-20px' }}></div>

        <ButtonList file={file} onFileDelete={onFileDelete} />
        </>
      }
    </div>
  )
}

export default FilePreviewSidebar