/* eslint-disable react/prop-types */
const Fallback = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center">
        {children}
    </div>
  )
}

export default Fallback;