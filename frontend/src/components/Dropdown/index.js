import { cloneElement, useState, useRef } from 'react'
import Overlay from '../Overlay'
import { FaExternalLinkAlt, FaArrowDown, FaTrashAlt } from 'react-icons/fa'

import style from './style.module.css'

const DropdownItem = ({ leftIcon, text }) => {
  return (
    <div className={style.dropdownItem}>
      <div className={style.leftIcon}>
        {leftIcon}
      </div>
      
      <span className={style.text}>
        {text}
      </span>
    </div>
  )
}

const Dropdown = ({ children }) => {
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const [position, setPosition] = useState({
    x: 0, 
    y: 0
  })

  const processPosition = () => {
    // Check if target.current is not null
    if (!target.current) return

    // Set dropdown position
    const domRect = target.current.getBoundingClientRect()

    setPosition({
      x: domRect.x, 
      y: domRect.y + 25
    })
  }

  return (
    <>
      {cloneElement(children, {
        ref: target,
        onClick: () => {
          processPosition()

          setShow(true)
        }
      })}

      {show && 
        <Overlay 
          onClose={() => setShow(false)}
          showBackgroundColor={false}
        >

          <div 
            className={style.dropdownMenu}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onClick={e => e.stopPropagation()} // Prevent overlay click propagation
          >
            <DropdownItem
              leftIcon={<FaExternalLinkAlt />} 
              text="Open"
            />
            
            <DropdownItem 
              leftIcon={<FaArrowDown />}
              text="Download"
            />

            <DropdownItem 
              leftIcon={<FaTrashAlt />}
              text="Delete"
            />
          </div>

        </Overlay>
      }
    </>
  )
}

export default Dropdown