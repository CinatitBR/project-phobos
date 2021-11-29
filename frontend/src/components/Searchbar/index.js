import searchIcon from '../../assets/search-icon.svg' 

import './index.css'

const Searchbar = ({ onChange, keyword }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div 
      className="searchBar" 
      tabIndex="-1"
    >
      <img src={searchIcon} alt="Search icon" />

      <input 
        type="text"
        value={keyword} 
        onChange={handleChange}
      />
    </div>
  )
}

export default Searchbar
