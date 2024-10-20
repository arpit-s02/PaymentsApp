import { useEffect, useState } from "react";
import Searchbar from "./Searchbar"
import UsersWrapper from "./UsersWrapper";
import config from "../../config.js";
import axios from "axios";
import Loader from "./Loader.jsx";

const UsersSection = () => {
    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);

    const fetchUsers = async () => {
        const { rootEndpoint } = config;
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.get(`${rootEndpoint}/user/bulk?filter=${searchValue}`, options);
            return response.data.users;

        } catch (error) {
            return [];

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        clearTimeout(timeoutId);

        const id = setTimeout(async () => {
            const data = await fetchUsers();
            setUsers(data);
        }, 500);

        setTimeoutId(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <div className="flex flex-col gap-y-2">
            <header>
                <h1 className="font-bold">Users</h1>
            </header>

            <Searchbar
                searchValue={searchValue}
                updater={setSearchValue}
                placeholder={"Search users..."}
            />

            {loading ? (
                <div className="flex justify-center">
                    <Loader fill={"black"} />
                </div>
            ) : (
                <UsersWrapper users={users}/>
            )}
        </div>
    )
}

export default UsersSection