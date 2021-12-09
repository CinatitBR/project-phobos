import { useRef, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'

import style from './style.module.css'

const Collapse = ({ children, className, background }, ref) => {
  const collapseEle = useRef(null)

  useImperativeHandle(ref, () => ({
    open() {
      collapseEle.current.style.padding = '15px'
      
      const { scrollHeight } = collapseEle.current
      collapseEle.current.style.maxHeight = `${scrollHeight}px`
    },
    close() {
      collapseEle.current.style.padding = '0px'
      collapseEle.current.style.maxHeight = '0px'
    }
  }))

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

export default forwardRef(Collapse)