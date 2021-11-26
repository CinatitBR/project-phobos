import { useEffect, useRef } from 'react'
import classNames from 'classnames'

import style from './style.module.css'

const Collapse = ({ isOpen, children, className }) => {
  const collapseEle = useRef(null)

  // Handle Collapse opening and closing
  useEffect(() => {
    // Check if ref is null
    if (!collapseEle) return null

    if (isOpen) {
      collapseEle.current.style.padding = '15px'

      const { scrollHeight } = collapseEle.current
      collapseEle.current.style.maxHeight = `${scrollHeight}px`
    } 
    else {
      collapseEle.current.style.maxHeight = '0'
      collapseEle.current.style.padding = '0'
    }
  }, [isOpen])

  return (
    <section 
      className={classNames(style.collapse, className)}
      ref={collapseEle}
    >
      {children}
    </section>
  )
} 

export default Collapse