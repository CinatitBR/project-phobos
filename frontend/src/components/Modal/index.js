import classNames from 'classnames'
import { CloseIcon } from '../Buttons'
import Overlay from '../Overlay'

import style from './style.module.css'

const Modal = ({ show, onClick, onClose, title, children, className, ...rest }) => {
  if (!show) return null

  return (
    <Overlay onClose={onClose}>
      <div 
        id={style.modal}
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
            <h3 className={style.title}>{title}</h3>
          }

          <CloseIcon 
            size="25px" 
            className={style.closeIcon}
            onClick={() => onClose(false)}
          />
        </header>
        
        {children}
      </div>
    </Overlay>
  )
}

export default Modal