import {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import {toast, Bounce} from 'react-toastify';

const PasswordChange = ({user, setUser}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    let navigate = useNavigate();

    const handleLogout = () => {
        // set user to null
        setUser(null);
        // remove token from localstorage
        localStorage.removeItem("token");
        // navigate to the homepage
        navigate('/');
    }

    const showToastMsg = (type, msg) => {
        if(type == 'success'){
            toast.success('Password changed successfully!', {
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
            toast.info('Please log in again!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        console.log(`Password values: ${oldPassword}; ${newPassword}; ${newPasswordConfirm}`);
        try {
            // check new password matches
            if(newPassword !== newPasswordConfirm){
                showToastMsg("error", "Passwords do not match!");
                setNewPasswordConfirm("");
                return;
            }
            console.log("The email before sending is: ", user.email);
            // send axios request with old and new password also the email to identify
            await axios.post('/api/users/password-change', {oldPassword, newPassword, email: user.email});
            
            // show toast
            showToastMsg("success");
            
            // logout user
            handleLogout();        
            
        } catch (error) {
            // catch errors
            console.log("Error in catch block while updating password: ", error);
            showToastMsg("error", 'Error! Failed to update!');
        }
    }

    return (
        <>
        <div className="title">
            <p className="text-2xl font-bold mt-10">Change Password</p>
        </div>

        <div className="password-change-form">
            <form className="form" onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label>Enter Old Password</label>
                    <input type="text" name="email" placeholder="Old Password..." value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} autoComplete="off" required />
                </div>

                <div className="form-group">
                    <label>Enter New Password</label>
                    <input type="text" name="email" placeholder="New Password..." value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="off" required />
                </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="text" name="email" placeholder="Confirm Password..." value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} autoComplete="off" required />
                </div>

                <button className="btn-primary">Save</button>
                <button className="btn-secondary hover:bg-red-200">Cancel</button>
            </form>
        </div>
        </>
    )
}



export default PasswordChange;