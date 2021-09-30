import Button from '../Button'
import { FaUpload } from 'react-icons/fa'

import style from './style.module.css'

const FileDropBox = () => {
  return (
    <div className={style.fileDropBox}>
      <FaUpload size="100px" className={style.uploadIcon} />

      <div className={style.suggestion}>
        <p>Drag to upoload</p>

        <span className={style.pseudo}>
          <span className={style.content}>or select a file</span>
        </span>
      </div>

      <Button>Select file</Button>
    </div>
  )
}

export default FileDropBox