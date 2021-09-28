import { useState } from 'react'

import './index.css'

const Searchbar = ({ onChange }) => {
  const [keyword, setKeyword] = useState('')

  const handleChange = (event) => {
    const keyword = event.target.value

    setKeyword(keyword)
    onChange(keyword)
  }

  return (
    <input 
      id="searchBar" 
      type="text"
      value={keyword} 
      onChange={handleChange}
    />
  )
}

export default Searchbar
