import Modal from '../Modal'
import FileDropBox from '../FileDropBox'
import FileLoading from '../FileLoading'

import style from './style.module.css'

const AddDocumentModal = ({ show, onClose }) => {
  return (
    <Modal className={style.addDocumentModal} title="Upload document" show={show} onClose={onClose}>
      <div className={style.wrapper}>
        <FileDropBox />
      
        <div className={style.fileLoadingList}>
          <FileLoading />
        </div>

      </div>
    </Modal>
  )
}

export default AddDocumentModal