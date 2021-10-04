import classNames from 'classnames'
import Portal from '../Portal'
import { FaTimes } from 'react-icons/fa'

import './index.css'

const Modal = ({ show, onClose, title, children, className, ...rest }) => {
  if (!show) return null

  return (
    <Portal>
      <div className="overlay">

        <div 
          id="modal" 
          className={classNames({ show }, className)} 
          {...rest}
        >
          <header>
            {title &&
              <h3 className="title">{title}</h3>
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