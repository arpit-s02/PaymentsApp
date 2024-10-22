/* eslint-disable react/prop-types */
const Loader = ({ fill }) => {
  
  return (
    <div 
      style={{ borderColor: fill }} 
      className="animate-spin rounded-full w-5 h-5 border-t-2"
    >
    </div>
  )
}

export default Loader;