import { useState } from "react"
import DisplayName from "../components/DisplayName"
import DisplayPicture from "../components/DisplayPicture"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate, useSearchParams } from "react-router-dom"
import config from "../../config.js"
import axios from "axios"
import Alert from "../components/Alert.jsx"

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [alertDetails, setAlertDetails] = useState({
    message: "",
    type: ""
  });
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get('friend');
  const name =searchParams.get('name');

  const navigate = useNavigate();

  const createTransaction = async (rootEndpoint, options) => {
    try {
      const payload = { recipientId, amount: Number(amount) };

      const response = await axios.post(`${rootEndpoint}/transaction/new`, payload, options);
      const { transactionId } = response.data;
      return transactionId;

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setAlertDetails({ message, type: "failed" });
      return null;
    }
  }

  const transferMoney = async(rootEndpoint, options, transactionId) => {
    try {
      const payload = { transactionId };

      await axios.post(`${rootEndpoint}/account/transfer`, payload, options);

    } catch (error) {
      console.error(error);
    }
  }

  const pay = async (event) => {
    event.preventDefault();
    
    if(!amount || Number(amount) <= 0) {
      setAlertDetails({ message: "Please enter a valid amount", type: "failed" });
      return;
    }
    
    const { rootEndpoint } = config;
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    try {
      setLoading(true);
      setAlertDetails({ message: "", type: "" });

      // create a new transaction
      const transactionId = await createTransaction(rootEndpoint, options);
  
      if(!transactionId) return;
      
      // transfer money using the transactionId
      await transferMoney(rootEndpoint, options, transactionId);
      
      // navigate to result page to show payment status
      navigate(`/paymentResult?transactionId=${transactionId}`);
      
    } catch(error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className="min-h-screen h-fit flex justify-center items-center bg-gray-200">
        <div className="w-[360px] flex flex-col gap-y-8 p-8 bg-white shadow-md rounded-md">
            <header>
                <h1 className="text-lg text-center font-bold">Send Money</h1>
            </header>

            <div className="flex items-center gap-x-2">
                <DisplayPicture letter={name[0]} />
                <DisplayName name={name} />
            </div>

            <form onSubmit={pay} className="flex flex-col gap-y-4 items-center">
              <Input 
                type="number"
                placeholder="Enter amount"
                label="Amount in Rs"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button loading={loading} bgColor="green">Pay</Button>

              {alertDetails.message && <Alert {...alertDetails} />}
            </form>

        </div>
    </div>
  )
}

export default Payment