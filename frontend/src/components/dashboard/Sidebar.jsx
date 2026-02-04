import { Link, useNavigate } from "react-router";

const Sidebar = () => {

  let navigate = useNavigate();

  const handleItemClick = (e) => {

    const value = e.target.dataset.value;
    console.log("Clicked on Settings");
    if(value == "settings"){
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