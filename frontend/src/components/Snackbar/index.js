import { forwardRef, useImperativeHandle, useState } from 'react'
import classNames from 'classnames'
import Portal from '../Portal'

import style from './style.module.css'

const Snackbar = ({count, icon, text, buttons = [], className}, ref) => {
  const [show, setShow] = useState(false)
  const [animationStyle, setAnimationStyle] = useState('')

  useImperativeHandle(ref, () => ({
    show() {
      // If count is known
      if (count) {
        // Add fadeIn and fadeOut animations
        setAnimationStyle(`${style.fadeIn} 300ms, ${style.fadeOut} 300ms ${count - 300}ms`)

        // Open snackbar
        setShow(true)

        // Close snackbar after count
        setTimeout(() => setShow(false), count)
      }

      // If count is not known
      else {
        // Add fadeIn animation
        setAnimationStyle(`${style.fadeIn} 300ms`)

        // Open snackbar
        setShow(true)
      }
    },

    // Used by parent component to close snackbar when count is not known
    close() {
      // Add fadeOut animation
      setAnimationStyle(`${style.fadeOut} 300ms`) 

      // Close snackbar after animation duration (300ms)
      setTimeout(() => setShow(false), 300)
    }
  }))

  if (!show) return null

  return (
    <Portal>
      <div 
        className={classNames(style.snackbar, className)} 
        style={{ animation: animationStyle }}
      >
        <div className={style.info}>
          <div className={style.iconWrapper}>
            {icon}
          </div>

          <p>{text}</p>
        </div>

        <div className={style.buttons}>
          {buttons.map((button, index) => (
            <span key={index} onClick={button.onClick}>{button.text}</span>
          ))}
        </div>
      </div>
    </Portal>
  )
}

export default forwardRef(Snackbar)