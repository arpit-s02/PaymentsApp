import { useEffect } from "react";
import Balance from "../components/Balance"
import Navbar from "../components/Navbar"
import UsersSection from "../components/UsersSection";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate("/signin");
        }
    })

    return (
        <div>
            <Navbar />

            <div className="flex flex-col gap-y-8 p-8">
                <Balance />

                <UsersSection />
                
            </div>
        </div>
    )
}

export default Dashboard