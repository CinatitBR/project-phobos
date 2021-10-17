import Portal from '../Portal'
import style from './style.module.css'

const Overlay = ({ children, showBackgroundColor = true, onClose }) => {
  return (
    <Portal>
      <div 
        className={style.overlay} 
        style={{ background: (!showBackgroundColor && 'transparent') }}
        onClick={onClose}
      >
        {children}
      </div>
    </Portal>
  )
}

export default Overlay