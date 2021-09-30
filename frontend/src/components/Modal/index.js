import Portal from '../Portal'
import { FaTimes } from 'react-icons/fa'

import './index.css'

const Modal = ({ show, onClose, title, children, ...rest }) => {
  if (!show) return null

  return (
    <Portal>
      <div className="overlay">

        <div id="modal" {...rest}>
          <header>
            {title &&
              <h3 className="title">{title && title}</h3>
            }

            <FaTimes 
              className="closeButton" 
              size="25px" 
              onClick={onClose}
            />
          </header>

          <div className="wrapper">
            {children}
          </div>
        </div>

      </div>
    </Portal>
  )
}

export default Modal