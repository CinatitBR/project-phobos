import style from './style.module.css'

const Overlay = ({ children, showBackgroundColor = true, onClose }) => {
  return (
    <div 
      className={style.overlay} 
      style={{ background: (!showBackgroundColor && 'transparent') }}
      onClick={onClose}
    >
      {children}
    </div>
  )
}

export default Overlay