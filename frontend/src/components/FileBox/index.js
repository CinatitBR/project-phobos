import { useState } from 'react'
import { openFile } from '../../apis/viewSDKClient'
import classNames from 'classnames'
import useAuth from '../../hooks/useAuth'
import FileTag from '../FileTag'
import Dropdown from '../../components/Dropdown'
import { FaFilePdf, FaEllipsisV, FaExternalLinkAlt, FaArrowDown, FaTrashAlt } from 'react-icons/fa'
import { Button, LinkIcon } from '../Buttons'
import Modal from '../Modal'

import style from './style.module.css'

const FileBox = ({ file, onFileClick, onFileDelete }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const userId = useAuth().user.id

  let dropdownItems = [
    {
      id: 0,
      leftIcon: <FaExternalLinkAlt />,
      text: 'Open',
      onClick: () => openFile(file.title, file.fileUrl)
    },
    {
      id: 1,
      leftIcon: <FaArrowDown />,
      text: 'Download',
      onClick: () => window.open(file.fileUrl, '_blank')
    },
    {
      id: 2,
      leftIcon: <FaTrashAlt />,
      text: 'Delete',
      onClick: () => setShowDeleteModal(true)
    }
  ]

  // If file is shared, remove delete button
  if (userId !== file.user_id) 
    dropdownItems.pop()

  return (
    <article 
      className={style.fileBox}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => onFileClick(file)}
    >
      <header className={style.fileBoxHeader}>
        {(userId !== file.user_id) && 
          <LinkIcon />
        }

        <Dropdown
          items={dropdownItems}
          margin={5}
        > 
          <span className={classNames(
            style.wrapperOptions,
            {[style.hide]: !showOptions}
          )}>
            <FaEllipsisV className={style.options}/>
          </span>
        </Dropdown>
      </header>

      
      <div className={style.fileBoxBody}>
        <FaFilePdf className={style.fileIcon} />

        <h3 className={style.fileTitle}>
          {file.title}
        </h3>
      </div>

      <footer>
        <div className={style.info}>
          <div className={style.fileSize}>
            <header>Size</header>
            <div className={style.size}>{file.size}</div>
          </div>

          <FileTag>
            {file.tag_name}
          </FileTag>
        </div>
      </footer>

      {/* Delete Modal */}
      <Modal 
        className={style.deleteModal}
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        title="Delete file?"
      >
        <div className={style.wrapper}>
          <div className={style.modalBody}>
            <p>Are you sure you want to delete <span className={style.fileName}>{file.title}</span> from Phobos?</p>
          </div>

          <footer>
            <Button 
              className={classNames(style.cancelButton, style.button)}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button 
              className={classNames(style.deleteButton, style.button)}
              onClick={() => {
                // Close modal
                setShowDeleteModal(false)
                
                // Delete file
                onFileDelete(file.id)
              }}
            >
              Delete
            </Button>
          </footer>
        </div>
      </Modal>
    </article>
  )
}

export default FileBox