import './index.css'

const Searchbar = ({ onChange, keyword }) => {
  const handleChange = (event) => {
    onChange(event.target.value)
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
