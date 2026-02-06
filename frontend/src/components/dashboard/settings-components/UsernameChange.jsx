import { useState } from "react";
import axios from "axios";
import {toast, Bounce} from 'react-toastify';
import { useNavigate } from "react-router";

const UsernameChange = ({user, setUser}) => {

    const [username, setUsername] = useState("");

    const showToastMsg = (type, msg) => {
        if(type == 'success'){
            toast.success(msg, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if(type == 'error'){
            toast.error(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("New username:", username);

        try {
            // send a post request
            console.log("the user data of logged in user: ", user);

            if(user.id != undefined){
                const res = await axios.post('/api/users/update', {username: username, id: user.id}); // username is new, id is old
                // update only the username in frontend
                setUser(prev => ({ ...prev, username: res.data.username}));
            }
            else{
                const res = await axios.post('/api/users/update', {username: username, id: user._id}); // username is new, id is old
                // update only the username in frontend
                setUser(prev => ({ ...prev, username: res.data.username}));
            }
            showToastMsg("success", 'Username changed successfully!');

            // navigate back to settings
            navigate("/dashboard/settings")


        } catch (error) {
            // catch any error
            console.log("Error in catch block: ", error);
            showToastMsg("error", "Server Error! Try again!");

        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="mt-50 mb-30">
            <input
                className='text-gray-900 p-2'
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
        </form>
    )
}

export default UsernameChange;