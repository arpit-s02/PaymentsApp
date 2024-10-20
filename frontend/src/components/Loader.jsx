/* eslint-disable react/prop-types */
const Loader = ({ fill }) => {
  return (
    <div className={`animate-spin rounded-full w-5 h-5 border-t-2 border-[${fill}]`}>
    </div>
  )
}

export default Loader;