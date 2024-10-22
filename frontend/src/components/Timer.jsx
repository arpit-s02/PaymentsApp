/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({ intialTime, redirectPath }) => {
    const [timer, setTimer] = useState(intialTime);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(intervalId); // Clear the interval when the timer reaches 0
                    navigate(redirectPath); // Navigate to dashboard
                    return 0; // Set timer to 0
                }
                return prevTimer - 1; // Decrease timer
            });
        }, 1000);

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

  return (
    <p className="text-center">Redirecting in {timer} seconds</p>
  )
}

export default Timer