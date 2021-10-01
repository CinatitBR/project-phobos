import { useState } from 'react'
import Modal from '../Modal'
import FileDropBox from '../FileDropBox'
import FileLoading from '../FileLoading'

import style from './style.module.css'

const AddDocumentModal = ({ show, onClose }) => {
  const [progress, setProgress] = useState(0) // File loading progress (percentage)

  return (
    <Modal className={style.addDocumentModal} title="Upload document" show={show} onClose={onClose}>
      <div className={style.wrapper}>
        <FileDropBox onProgressChange={setProgress} />
      
        <div className={style.fileLoadingList}>
          <FileLoading progress={progress} />
        </div>

      </div>
    </Modal>
  )
}

export default AddDocumentModal