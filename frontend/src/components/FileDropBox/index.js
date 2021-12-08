import { useState, useRef } from 'react'
import classNames from 'classnames'
import { Button } from '../Buttons'
import { FaUpload } from 'react-icons/fa'

import style from './style.module.css'

const FileDropBox = ({ onFileDrop }) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputFileRef = useRef(null)
  
  const handleFileSelect = async e => {
    const files = e.target.files 
    const allowedFiles = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Check if files are the allowed type
      if (file.type === 'application/pdf')
        allowedFiles.push(file)
    }

    onFileDrop(allowedFiles)
  }

  const handleDrop = async e => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault()
    setIsDragActive(false)

    const { items } = e.dataTransfer 
    const allowedFiles = []
    
    // Get file objects of PDFs
    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      // Check if file is a PDF
      if (item.kind === 'file' && item.type === 'application/pdf')
        allowedFiles.push(item.getAsFile())
    }

    onFileDrop(allowedFiles)
  }

  const handleDragOver = e => {
    // Prevent default bevahior (Prevent resetting the current drag operation to "none")
    e.preventDefault()
  }

  return (
    <div 
      className={classNames(style.fileDropBox, { [style.drag]: isDragActive })} 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      onDragEnter={() => setIsDragActive(true)}
      onDragLeave={() => setIsDragActive(false)}
    >
      <FaUpload size="100px" className={style.uploadIcon} />

      <div className={style.suggestion}>
        <p>Drag to upload</p>

        <span className={style.pseudo}>
          <span className={style.content}>or select a file</span>
        </span>
      </div>

      <Button 
        className={style.fileButton}
        // Click on input file
        onClick={() => inputFileRef.current.click()}
      >
        Select file
      </Button>

      <input 
        ref={inputFileRef} 
        type="file" id={style.fileInput} 
        accept="application/pdf"
        multiple
        onChange={handleFileSelect}
      />
    </div>
  )
}

export default FileDropBox