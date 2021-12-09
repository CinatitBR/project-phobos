import { useEffect, useRef } from 'react'
import classNames from 'classnames'

import style from './style.module.css'

const Collapse = ({ open, children, className, background }) => {
  const collapseEle = useRef(null)
  
  useEffect(() => {
    if (open) {
      collapseEle.current.style.padding = '15px'
      
      const { scrollHeight } = collapseEle.current
      collapseEle.current.style.maxHeight = `${scrollHeight}px`
    }
    else {
      collapseEle.current.style.padding = '0px'
      collapseEle.current.style.maxHeight = '0px'
    }
  }, [open])

  return (
    <section 
      ref={collapseEle}
      className={classNames(style.collapse, className)}
      style={{ background }}
    >
      {children}
    </section>
  )
} 

export default Collapse