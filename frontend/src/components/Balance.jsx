import { useEffect, useState } from "react";
import config from "../../config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const Balance = () => {

    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBalance = async () => {
        const { rootEndpoint } = config;

        try {
            const token = localStorage.getItem('token');

            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.get(`${rootEndpoint}/account/balance`, options);

            return response.data.balance;
            
        } catch(error) {
            if(error.response?.status === 403) {
                localStorage.removeItem('token')
                navigate("/signin")
            }
            
            return null;
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const userBalance = await fetchBalance();
            setBalance(userBalance);
        })();
    }, []);

    return (
        <div className="flex gap-x-2">
            <span className="font-bold">Your balance </span>

            {loading ? <Loader fill="black" /> : balance && `Rs ${balance}` || "Couldn't fetch balance"}
        </div>
    )
}

export default Balance