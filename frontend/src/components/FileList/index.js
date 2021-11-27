import FileBox from '../../components/FileBox'

import style from './style.module.css'

const FileList = ({ files, onFileClick }) => {
  return (
    <div className={style.fileList}>
      {files.map(file => 
        <FileBox 
          key={file.id}
          file={file}
          onFileClick={onFileClick}
        />  
      )}
    </div>
  )
} 

export default FileList