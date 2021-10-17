import { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import Dropdown from '../Dropdown'
import classNames from 'classnames'

import style from './style.module.css'

const Select = ({ label, items, ...props }) => {
  const [selected, setSelected] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const formattedItems = items.map(item => {
    return {
      text: item.text, 
      onClick: () => setSelected(item.text)
    }
  })

  return (
    <Dropdown 
      margin={5} 
      fullWidth={true}
      items={formattedItems}
      onClose={() => setIsFocused(false)}
      onOpen={() => setIsFocused(true)}
    >
      <div 
        className={style.select} 
        {...props}
      >
        { <span className={style.selected}>{selected}</span> || 
          label
        }
        
        <FaChevronUp 
          className={classNames(
            style.collapseIcon, 
            {[style.focus]: isFocused}
          )} 
        />
      </div>
    </Dropdown>
  )
}

export default Select