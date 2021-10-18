import { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import Dropdown from '../Dropdown'
import classNames from 'classnames'

import style from './style.module.css'

const Select = ({ label, items, ...props }) => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const formattedItems = items.map(item => {
    return {
      text: item, 
      onClick: () => {
        setSelected(item)
        setIsOpen(false)
      }
    }
  })

  // Add default option to the beginning of the array
  formattedItems.unshift({  
    text: label,
    defaultValue: true,
    onClick: () => { 
      setSelected(null)
      setIsOpen(false)
    },
  })

  return (
    <Dropdown 
      margin={5} 
      fullWidth={true}
      items={formattedItems}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <div 
        className={style.select} 
        {...props}
      >
        {selected ? 
          <span className={style.selected}>{selected}</span> : 
          label
        }
        
        <FaChevronUp 
          className={classNames(
            style.collapseIcon, 
            {[style.open]: isOpen},
            {[style.selected]: selected}
          )} 
        />
      </div>
    </Dropdown>
  )
}

export default Select