import Loader from "./Loader"

/* eslint-disable react/prop-types */
const Button = ({ children, loading }) => {
  return (
    <button 
      disabled={loading}
      className={`flex justify-center items-center h-12 bg-black text-white w-full rounded`}
    >
      {loading ? <Loader fill="white"/> : children}
    </button>
  )
}

export default Button