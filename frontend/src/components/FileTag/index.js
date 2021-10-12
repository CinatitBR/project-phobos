import style from './style.module.css'

const FileTag = ({ tagName }) => {
  return (
    <span className={style.fileTag}>
      {tagName}
    </span>
  )
}

export default FileTag