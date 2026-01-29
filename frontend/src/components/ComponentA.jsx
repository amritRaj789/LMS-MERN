import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function ComponentA() {

  const [activeTab, setActiveTab] = useState("register");
  
  // to control mount/unmount
  const [isOpen, setIsOpen] = useState(true);

  //
  const [isClosing, setIsClosing] = useState(false);

  const openAuth = () => {
    setIsOpen(true);
    setIsClosing(false);
  }

  const closeAuth = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300) // to match css animation duration
  }

  // child(register form) to parent 
  const changeActiveState = () => {
    setActiveTab("login");
  };


  // check state first 
  // if(!isOpen) return null;

  return (
    <div className="app-wrapper">
      {/* Open Auth Button */}
      {!isOpen && (
        <button className="open-btn" onClick={openAuth}>
          Sign Up / Login
        </button>
      )}

      {/* Auth Container */}
      {isOpen && (
        <div className={`container ${isClosing ? "fade-out" : "fade-in"}`}>

          <button className="close-btn" onClick={closeAuth}>
          ×
          </button>

          {/* Tabs */}
          <div className="nav">
            <button
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>

            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </div>

          {/* showing the active content */}
          {activeTab === "register" ? <Register onLoginButtonClick={changeActiveState}/> : <Login />}
        </div>
      )}
      
    </div>
  );
}

export default ComponentA;