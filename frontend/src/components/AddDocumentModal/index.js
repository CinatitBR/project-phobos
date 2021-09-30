import Modal from '../Modal'
import Button from '../Button'
import { FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa'

import './index.css'

const AddDocumentModal = () => {
  return (
    <Modal className="AddDocumentModal" title="Upload document" show={true}>
      <div className="body">
        <div id="fileDropBox">
          <FaUpload size="100px" className="uploadIcon" />

          <div className="suggestion">
            <p>Drag to upoload</p>

            <span className="pseudo">
              <span className="content">or select a file</span>
            </span>
          </div>

          <Button>Select file</Button>
        </div>
      
        <div className="fileLoadingList">

          <article className="fileLoading">
            <FaFilePdf className="fileIcon" />

            <div className="content">
              <div className="info">
                <h3 className="filename">Matemática 1.pdf</h3>
                
                <span className="fileSize">10mb</span>

                <FaTimes className="closeIcon" />
              </div>

              <div className="loadingBar">
                <div className="loadingBarInner"></div>
              </div>
            </div>
          </article>

        </div>

      </div>
    </Modal>
  )
}

export default AddDocumentModal