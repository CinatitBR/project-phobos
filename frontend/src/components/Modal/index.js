import Portal from '../Portal'
import { FaTimes } from 'react-icons/fa'

import './index.css'

const Modal = ({ show, onClose, children, ...rest }) => {
  if (!show) return null

  return (
    <Portal>
      <div className="overlay">

        <div id="modal" {...rest}>
          <FaTimes 
            className="closeButton" 
            size="25px" 
            onClick={onClose}
          />

          <div className="wrapper">
            {children}
          </div>
        </div>

      </div>
    </Portal>
  )
}

export default Modal