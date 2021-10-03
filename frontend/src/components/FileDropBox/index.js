import { useState } from 'react'
import classNames from 'classnames'
import Button from '../Button'
import { FaUpload } from 'react-icons/fa'

import style from './style.module.css'

const FileDropBox = ({ onFileUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false)
  
  const handleDrop = async e => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault()

    const { items } = e.dataTransfer

    // Get file objects of uploaded PDFs
    const uploadedFiles = []

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.kind === 'file' && item.type === 'application/pdf')
        uploadedFiles.push(item.getAsFile())
    }

    onFileUpload(uploadedFiles)
  }

  const handleDragOver = e => {
    // Prevent default bevahior (Prevent resetting the current drag operation to "none")
    e.preventDefault()
  }

  // Toggle isDragActive
  const toggleDrag = () => {
    setIsDragActive(!isDragActive)
  }

  return (
    <div 
      className={classNames(style.fileDropBox, { [style.drag]: isDragActive })} 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      onDragEnter={toggleDrag}
      onDragLeave={toggleDrag}
    >
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