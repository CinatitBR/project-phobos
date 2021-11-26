import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Dropdown from '../Dropdown'
import { ChevronIcon } from '../Buttons'

import style from './style.module.css'

const Select = ({ 
  label, 
  items, 
  onSelect, 
  disabled,
  ...props 
}) => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  
  const formattedItems = items.map(item => {
    return {
      text: item.text, 
      id: item.id,
      onClick: () => {
        setSelected(item.text)
        setIsOpen(false)
        onSelect(item)
      }
    }
  })

  // When there's no label, set first item as selected
  useEffect(() => {
    // If there is a label, add it to the beginning of the select...
    // and set is as selected
    if (label) {
      formattedItems.unshift({  
        text: label,
        id: -1,
        defaultValue: true,
        onClick: () => { 
          setSelected(null)
          setIsOpen(false)
          onSelect({ text: null, id: null })
        },
      })
    } 
    else { // If there is no label, set first item as selected
      setSelected(formattedItems[0].text)
    }
  }, [])

  return (
    <Dropdown 
      margin={5} 
      fullWidth={true}
      items={formattedItems}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <div 
        className={classNames(style.select, { disabled })} 
        {...props}
      >
        {selected ? 
          <span className={style.selected}>{selected}</span> : 
          label
        }
        
        <ChevronIcon 
          isOpen={isOpen || selected}
          size="24px"
          colorClosed="var(--secondary-text)"
        />
      </div>
    </Dropdown>
  )
}

export default Select