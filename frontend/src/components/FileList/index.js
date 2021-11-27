import FileBox from '../../components/FileBox'

import style from './style.module.css'

const FileList = ({ files, onFileClick }) => {
  return (
    <div className={style.fileList}>
      {files.map(file => 
        <FileBox 
          key={file.id}
          id={file.id}
          filename={file.title}
          tagName={file.tag_name}
          fileSize={file.size}
          onFileClick={onFileClick}
        />  
      )}
    </div>
  )
} 

export default FileList