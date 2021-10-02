import { useState, useEffect } from 'react'
import Modal from '../Modal'
import FileDropBox from '../FileDropBox'
import FileLoading from '../FileLoading'

import style from './style.module.css'

const AddDocumentModal = ({ show, onClose }) => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0) // File loading progress (percentage)

  useEffect(() => {
    // If modal is closed, clean files
    if (!show) setFile(null)
  }, [show])

  return (
    <Modal className={style.addDocumentModal} title="Upload document" show={show} onClose={onClose}>
      <div className={style.wrapper}>
        <FileDropBox onFileUpload={setFile} onProgressChange={setProgress} />
      
        <div className={style.fileLoadingList}>
          {file && 
            <FileLoading 
              filename={file.name} 
              size={Math.round((file.size / 10**6) * 100) / 100} 
              progress={progress} 
            />
          }
        </div>

      </div>
    </Modal>
  )
}

export default AddDocumentModal