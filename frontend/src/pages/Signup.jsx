import { useEffect, useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import Warning from "../components/Warning";
import config from "../../config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [formInputs, setFormInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const updateFormInputs = (key, value) => {
        setFormInputs({
            ...formInputs,
            [key]: value
        })
    }

    const register = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { rootEndpoint } = config;

        try {
            const response = await axios.post(`${rootEndpoint}/user/signup`, formInputs);
            
            if(response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                navigate('/dashboard');
            }
            
        } catch (error) {
            if(error.response?.data?.message) {
                const arr = error.response.data.message.split(", ");

                arr.forEach(info => alert(info));
            }
            else {
                alert("Something went wrong. Please try again later");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen p-8 h-fit bg-slate-300 flex justify-center items-center">
            <form 
                onSubmit={register}
                className="w-[360px] flex flex-col bg-white p-8 rounded-lg items-center gap-y-8"
            >
                <header>
                    <Heading label={"Sign up"} />

                    <Subheading text={"Enter your information to create an account"} />
                </header>

                <div className="flex flex-col w-full gap-y-4">
                    <Input 
                        label="First Name"
                        placeholder="First Name"
                        value={formInputs.firstName}
                        onChange={(e) => updateFormInputs("firstName", e.target.value)}
                    />

                    <Input 
                        label="Last Name"
                        placeholder="Last Name"
                        value={formInputs.lastName}
                        onChange={(e) => updateFormInputs("lastName", e.target.value)}
                    />

                    <Input 
                        label="Email"
                        placeholder="Email"
                        value={formInputs.email}
                        onChange={(e) => updateFormInputs("email", e.target.value)}
                    />

                    <Input 
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={formInputs.password}
                        onChange={(e) => updateFormInputs("password", e.target.value)}
                    />
                </div>

                <footer className="w-full">
                    <Button loading={loading}>Sign up</Button>

                   <Warning 
                        warning={"Already have an account?"}
                        url="/signin"
                        label="Sign in"
                   />
                </footer>
            </form>
        </div>
    )
}

export default Signup;