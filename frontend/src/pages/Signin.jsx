import { useEffect, useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import Warning from "../components/Warning";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";
import axios from "axios";

const Signin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [formInputs, setFormInputs] = useState({
        email: "",
        password: "",
    })

    const updateFormInputs = (key, value) => {
        setFormInputs({
            ...formInputs,
            [key]: value
        })
    }

    const login = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { rootEndpoint } = config;

        try {
            const response = await axios.post(`${rootEndpoint}/user/signin`, formInputs);

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
                onSubmit={login} 
                className="w-[360px] flex flex-col bg-white p-8 rounded-lg items-center gap-y-8"
            >
                <header>
                    <Heading label={"Sign in"} />

                    <Subheading text={"Enter your credentials to access your account"} />
                </header>

                <div className="flex flex-col w-full gap-y-4">
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
                    {loading ? (
                        <Button disabled={true}>
                            <Loader fill={"white"} />
                        </Button>

                    ) : (
                        <Button>Sign in</Button>
                    )}
                   <Warning 
                        warning={"Don't have an account?"}
                        url="/signup"
                        label="Sign up"
                   />
                </footer>
            </form>
        </div>
    )
}

export default Signin;