import {useState} from "react";
//import './Styles/Settings.css';
import axios from 'axios';
import { useNavigate } from "react-router";
import {toast, Bounce} from 'react-toastify';


const Settings = ({user, setUser}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    // const [showForm, setShowForm] = useState(false);

    let navigate = useNavigate();

    const handleLogout = () => {
        // set user to null
        setUser(null);
        // remove token from localstorage
        localStorage.removeItem("token");
        // navigate to the homepage
        navigate('/');
    }

    const showToastMsg = (type) => {
        if(type == 'success'){
            toast.success('Password changed successfully!', {
                position: "top-right",
                autoClose: 1500,
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
                autoClose: 3000,
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
            toast.error('Error! Failed to update!', {
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
                window.alert("Passwords do not match!");
                setNewPasswordConfirm("");
                return;
            }
            console.log("The email before sending is: ", user.email);
            // send axios request with old and new password also the email to identify
            const res = await axios.post('/api/users/password-change', {oldPassword, newPassword, email: user.email});
            console.log("The response from backend: ", res.data);
            
            // show toast
            showToastMsg("success");
            
            // logout user
            handleLogout();        
            
        } catch (error) {
            // catch errors
            console.log("Error in catch block while updating password: ", error);
            showToastMsg("error");
        }
    }



    // return (
    //     <div className="password-change-form">
    //         <button className='my-4 bg-gray-200 rounded hover:bg-gray-300' onClick={() => setShowForm(!showForm)}>
    //             Change Password
    //         </button>
    //         {showForm && (
    //             <form className="flex-col" onSubmit={handlePasswordChange} style={{ marginTop: "10px", marginBottom: "30px"}}>
    //                 <input
    //                     className='text-gray-900 p-2'
    //                     type="text"
    //                     placeholder="Enter Old Password"
    //                     value={oldPassword}
    //                     onChange={(e) => setOldPassword(e.target.value)}
    //                     required
    //                 />
    //                 <input
    //                     className='text-gray-900 p-2'
    //                     type="text"
    //                     placeholder="Enter new Password"
    //                     value={newPassword}
    //                     onChange={(e) => setNewPassword(e.target.value)}
    //                     required
    //                 />
    //                 <input
    //                     className='text-gray-900 p-2'
    //                     type="text"
    //                     placeholder="Confirm new Password"
    //                     value={newPasswordConfirm}
    //                     onChange={(e) => setNewPasswordConfirm(e.target.value)}
    //                     required
    //                 />
    //                 <button type="submit">Save Password</button>
    //                 <button type="button">Cancel</button>
    //             </form>
    //         )}
    //     </div>   
    // )

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
                <button type="reset" className="btn-secondary hover:bg-red-200">Cancel</button>
            </form>
        </div>
        </>
    )
}



//     const Settings = () => {
//     const [activeSetting, setActiveSetting] = useState(null);
//     const [value, setValue] = useState('');

//     const settingOptions = [
//         {key: 'username', label: 'Change Username'},
//         {key: 'password', label: 'Change Password'},
//         {key: 'email', label: 'Change Email'},
//         {key: 'phone', label: 'Change Phone'},
//         {key: 'address', label: 'Change Address'}
//     ]

//     const handleCancel = () => {

//     }

//     const handleSave = () => {

//     }
//     return (
//         <div className="settings-page mt-10">
//             <h1 className="settings-title mb-8">Settings</h1>

//             <div className="settings-container">
//                 {/* Left list */}
//                 <ul className="settings-list">
//                     {settingOptions.map((item) => (
//                         <li
//                         key={item.key}
//                         className={activeSetting === item.key ? "active" : ""}
//                         onClick={() => setActiveSetting(item.key)}
//                         >
//                         {item.label}
//                         </li>)
//                     )}
//                 </ul>
//                 {/* Right list */}
//                 {activeSetting ? 
//                 (
//                     <>
//                     <label className="form-label">
//                         {settingOptions.find((i) => i.key === activeSetting).label}
//                     </label>

//                     <input
//                         type={activeSetting === "password" ? "password" : "text"}
//                         value={value}
//                         onChange={(e) => setValue(e.target.value)}
//                         placeholder="Enter new value"
//                     />

//                     <div className="form-actions">
//                         <button className="btn-save" onClick={handleSave}>
//                         Save
//                         </button>
//                         <button className="btn-cancel" onClick={handleCancel}>
//                         Cancel
//                         </button>
//                     </div>
//                     </>
//                 ) : 
//                 (
//                     <p className="settings-placeholder">
//                     Select an option to update your details
//                     </p>
//                 )
//                 }
//             </div>
//         </div>
//     )
// }

export default Settings;