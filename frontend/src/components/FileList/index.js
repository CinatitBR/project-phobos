import FileBox from '../../components/FileBox'

import style from './style.module.css'

const FileList = ({ files }) => {
  return (
    <div className={style.fileList}>
      {files.map(file => 
        <FileBox 
          key={file.id}
          filename={file.title}
          tagName={'Math'}
          fileSize={'50 MB'}
        />  
      )}
    </div>
  )
} 

export default FileList