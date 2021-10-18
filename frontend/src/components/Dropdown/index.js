import { cloneElement, useState, useRef } from 'react'
import Overlay from '../Overlay'
import classNames from 'classnames'

import style from './style.module.css'

const DropdownItem = ({ 
  leftIcon, 
  text, 
  onClick, 
  defaultValue=false
}) => {
  return (
    <div 
      onClick={onClick} 
      className={classNames(
        style.dropdownItem, 
        {[style.default]: defaultValue}
      )} 
    >
      {leftIcon && 
        <div className={style.leftIcon}>
          {leftIcon}
        </div>
      }
      
      <span className={style.text}>
        {text}
      </span>
    </div>
  )
}

const Dropdown = ({ 
  children, 
  margin=0, 
  fullWidth=false, 
  items, 
  onClose, 
  onOpen
}) => {
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
      y: domRect.y + target.current.offsetHeight + margin
    })
  }

  return (
    <>
      {cloneElement(children, {
        ref: target,
        onClick: () => {
          processPosition()
          setShow(true)
          
          // Check if onOpen exists
          if (onOpen) onOpen()
        }
      })}

      {show && 
        <Overlay 
          onClose={() => {
            setShow(false)

            // Check if onClose exists
            if (onClose) onClose()
          }}
          showBackgroundColor={false}
        >

          <div 
            className={style.dropdownMenu}
            onClick={e => e.stopPropagation()} // Prevent overlay click propagation
            style={{ 
              left: `${position.x}px`, 
              top: `${position.y}px`, 
              width: fullWidth ? target.current.offsetWidth : '170px'
            }}
          >
            {items.map((item, index) =>
              <DropdownItem 
                key={index+1}
                leftIcon={item.leftIcon}
                text={item.text}
                defaultValue={item.defaultValue}
                onClick={() => {
                  setShow(false)

                  // Check if onClick exists
                  if (item.onClick) item.onClick()
                }}
              />
            )}
          </div>

        </Overlay>
      }
    </>
  )
}

export default Dropdown