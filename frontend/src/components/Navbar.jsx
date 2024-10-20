import { useEffect, useState } from "react"
import DisplayName from "./DisplayName"
import DisplayPicture from "./DisplayPicture"
import Logo from "./Logo"
import config from "../../config.js"
import axios from "axios"
import Loader from "./Loader.jsx"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const [firstName, setFirstName] = useState("User");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserdetails = async () => {
    const { rootEndpoint } = config;

    try {
      const token = localStorage.getItem('token');

      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(`${rootEndpoint}/user/details`, options);
      return response.data;

    } catch (error) {
      return null;

    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/signin");
  }

  useEffect(() => {
    (async () => {
      const userDetails = await fetchUserdetails();
      
      if(userDetails) {
        setFirstName(userDetails.firstName);
      }
    })();
  }, [])

  return (
    <nav className="flex justify-between items-center border-b p-2">
        <Logo />

        <div className="flex gap-x-4 items-center">
          {loading ? (
            <Loader fill={"black"} />
          ) : (
            <>
              <DisplayName name={firstName || "User"} />

              <DisplayPicture letter={firstName[0] || "u"} />

              <button onClick={logout}>Log out</button>
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar