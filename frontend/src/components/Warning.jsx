import { Link } from "react-router-dom"

const Warning = ({ warning, url, label }) => {
  return (
    <p className="text-center">
        {warning} <Link className="hover:underline" to={url}>{label}</Link>
    </p>
  )
}

export default Warning