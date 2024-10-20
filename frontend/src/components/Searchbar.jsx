/* eslint-disable react/prop-types */
const Searchbar = ({searchValue, updater, placeholder}) => {
  return (
    <input 
        className="w-full border p-2 rounded focus:outline-none" 
        placeholder={placeholder}
        value={searchValue}
        onChange={e => updater(e.target.value)}
    />
  )
}

export default Searchbar