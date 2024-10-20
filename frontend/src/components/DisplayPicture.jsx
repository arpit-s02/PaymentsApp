/* eslint-disable react/prop-types */
const DisplayPicture = ({ letter }) => {
  return (
    <div className="h-10 w-10 flex justify-center items-center bg-[#e0e7f0] rounded-[50%]">
        {letter.toUpperCase()}
    </div>
  )
}

export default DisplayPicture