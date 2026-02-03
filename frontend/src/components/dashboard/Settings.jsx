import {useState} from "react";
import './Styles/Settings.css';


// const Settings = () => {
//     return(
//         <div>
//             <h1 className="">This is the Settings page</h1>
//         </div>
//     )
// }

const Settings = () => {
    const [activeSetting, setActiveSetting] = useState(null);
    const [value, setValue] = useState('');

    const settingOptions = [
        {key: 'username', label: 'Change Username'},
        {key: 'password', label: 'Change Password'},
        {key: 'email', label: 'Change Email'},
        {key: 'phone', label: 'Change Phone'},
        {key: 'address', label: 'Change Address'}
    ]

    const handleCancel = () => {

    }

    const handleSave = () => {

    }
    return (
        <div className="settings-page mt-10">
            <h1 className="settings-title mb-8">Settings</h1>

            <div className="settings-container">
                {/* Left list */}
                <ul className="settings-list">
                    {settingOptions.map((item) => (
                        <li
                        key={item.key}
                        className={activeSetting === item.key ? "active" : ""}
                        onClick={() => setActiveSetting(item.key)}
                        >
                        {item.label}
                        </li>)
                    )}
                </ul>
                {/* Right list */}
                {activeSetting ? 
                (
                    <>
                    <label className="form-label">
                        {settingOptions.find((i) => i.key === activeSetting).label}
                    </label>

                    <input
                        type={activeSetting === "password" ? "password" : "text"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter new value"
                    />

                    <div className="form-actions">
                        <button className="btn-save" onClick={handleSave}>
                        Save
                        </button>
                        <button className="btn-cancel" onClick={handleCancel}>
                        Cancel
                        </button>
                    </div>
                    </>
                ) : 
                (
                    <p className="settings-placeholder">
                    Select an option to update your details
                    </p>
                )
                }
            </div>
        </div>
    )
}


export default Settings;