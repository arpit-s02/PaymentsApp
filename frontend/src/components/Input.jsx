const Input = ({ value, onChange, label, placeholder, type }) => {
  return (
    <div>
        <label className="inline-block mb-2 ml-0.5">{label}</label>

        <input 
          type={type || "text"}
          className="w-full h-12 p-4 border border-gray-200 rounded focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
    </div>
  )
}

export default Input;