import { useEffect } from 'react'
import Portal from '../Portal'
import style from './style.module.css'

const Overlay = ({ children, showBackgroundColor = true, onClose }) => {

  useEffect(() => {
    // Remove page scroll
    document.body.classList.add('noScroll')

    // Add page scroll
    return () => document.body.classList.remove('noScroll')
  })

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