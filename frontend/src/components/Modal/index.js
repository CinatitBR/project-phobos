import classNames from 'classnames'
import { CloseIcon } from '../Buttons'
import Portal from '../Portal'
import Overlay from '../Overlay'

import './index.css'

const Modal = ({ show, onClick, onClose, title, children, className, ...rest }) => {
  if (!show) return null

  return (
    <Portal>
      <Overlay onClose={onClose}>

        <div 
          id="modal" 
          className={classNames({ show }, className)} 
          onClick={e => {
            e.stopPropagation()

            // Check if onClick prop was passed
            if (onClick) onClick()
          }}
          {...rest}
        >

          <header>
            {title &&
              <h3 className="title">{title}</h3>
            }

            <CloseIcon 
              size="25px" 
              onClick={() => onClose(false)}
            />
          </header>

          {children}
        </div>

      </Overlay>
    </Portal>
  )
}

export default Modal