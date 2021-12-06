import FileBox from '../../components/FileBox'

import style from './style.module.css'

const FileList = ({ files, onFileClick, onConfirmDelete, onUndoDelete, onFileDelete }) => {
  return (
    <div className={style.fileList}>
      {files.map(file => 
        <FileBox 
          key={file.id}
          file={file}
          onFileClick={onFileClick}
          onFileDelete={onFileDelete}
        />  
      )}
    </div>
  )
} 

export default FileList