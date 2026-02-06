import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router';
import arrowIcon from "./right-arrow.png";
//import {useState} from "react";
import PasswordChange from "./settings-components/PasswordChange";


const Settings = ({user, setUser}) => {
    const options = [
    { label: "Email Adress", action: "email" },
    { label: "Password", action: "password" },
    { label: "Username", action: "username" },
    { label: "Phone Number", action: "phone" },
    { label: "Address", action: "address" },
  ];

  let navigate = useNavigate();

  const handleClick = (e) => {
    const action = e.currentTarget.dataset.action;
    //console.log("Button clicked:", action);
    
    // navigate to the corresponding component
    navigate(`/dashboard/settings/change-${action}`);
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="flex justify-center items-center min-h-[600px]">
          <div className="flex flex-col gap-6 w-full max-w-xl">
            {options.map((item, index) => (
              <div className="flex flex-row justify-between" key={index}>
                <button
                  data-action={item.action}
                  onClick={handleClick}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-left font-medium text-gray-700
                            hover:bg-gray-100 hover:border-gray-400
                            transition-all duration-200"
                >
                  {item.label}
                </button>
                <img src={arrowIcon} alt="Icon description" className="w-8 h-full p-1"></img>
              </div>  
              ))}
          </div>
        </div>
      } />
      <Route path="/change-password" element={<PasswordChange user={user} setUser={setUser}/>}/>
    </Routes>

    
  );
}

export default Settings;