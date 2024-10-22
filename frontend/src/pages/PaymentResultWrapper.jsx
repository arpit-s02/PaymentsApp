import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import config from "../../config.js";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import Fallback from "../components/Fallback.jsx";
import PaymentResult from "../components/PaymentResult.jsx";

const PaymentResultWrapper = () => {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTransactionDetails = async () => {
        const { rootEndpoint } = config;
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(`${rootEndpoint}/transaction/details?transactionId=${transactionId}`, options);
            return response.data;

        } catch(error) {
            return null;

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const details = await fetchTransactionDetails();
            setTransactionDetails(details);
        })();
    }, []);

    if(loading) {
        return (
            <Fallback>
                <Loader fill="black" />
            </Fallback>
        )
    }

    else if(!transactionDetails) {
        return (
            <Fallback>
                <h1 className="text-xl font-bold">Something went wrong</h1>
            </Fallback>
        )
    }

    return (
        <div className="min-h-screen h-fit flex justify-center items-center bg-gray-200">
            <PaymentResult { ...transactionDetails } />
        </div>
    )
}

export default PaymentResultWrapper