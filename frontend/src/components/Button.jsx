const Button = ({ children, disabled }) => {
  return (
    <button 
      disabled={disabled}
      className="flex justify-center items-center h-12 mb-4 bg-black text-white w-full rounded"
    >
      {children}
    </button>
  )
}

export default Button