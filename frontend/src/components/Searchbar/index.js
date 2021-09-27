import { useState, useEffect } from 'react'
import authAPI from '../../apis/authAPI'

import './index.css'

const Searchbar = () => {
  const [keyword, setKeyword] = useState('')
  // const [documentPreviews, setDocumentPreviews] = useState([])

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }
  
  useEffect(() => {
    const getDocumentPreviews = async () => {
      const response = await authAPI.search(keyword)
      const documentPreviews = response.data
  
      console.log(documentPreviews)
    }

    getDocumentPreviews()
  }, [keyword])

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
