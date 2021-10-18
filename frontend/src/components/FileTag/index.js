import classNames from 'classnames'

import style from './style.module.css'

const FileTag = ({ children, className, ...props }) => {
  return (
    <span className={classNames(style.fileTag, className)} {...props}>
      {children}
    </span>
  )
}

export default FileTag