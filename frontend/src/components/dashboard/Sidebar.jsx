import { Link, useNavigate } from "react-router";
import {toast} from 'react-toastify';

const Sidebar = () => {

  let navigate = useNavigate();

  const handleItemClick = (e) => {
    // console.log("List item onclick, ", e.target.dataset);
    const value = e.target.dataset.value;
    console.log("Clicked on Settings");
    if(value == "settings"){
      toast.success('Clicked on Settings!', {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
      });
      navigate('/dashboard/settings');
    }
    else if(value == "dashboard"){
      navigate('/dashboard');
    }
  };

  

  return (
    <div className="sidebar">
      <h2 className="logo">LMS</h2>

      <ul className="menu">
        <li role="button" data-value="dashboard" onClick={handleItemClick}>Dashboard</li>
        <li>Courses</li>
        <li>Assignments</li>
        <li>Students</li>
        <li role="button" data-value="settings" onClick={handleItemClick}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;