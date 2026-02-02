import { Link, useNavigate } from "react-router";

const Sidebar = () => {

  let navigate = useNavigate();

  const handleItemClick = () => {
    console.log("Clicked on Settings");
    navigate('/dashboard/settings');

  };

  

  return (
    <div className="sidebar">
      <h2 className="logo">LMS</h2>

      <ul className="menu">
        <li>Dashboard</li>
        <li>Courses</li>
        <li>Assignments</li>
        <li>Students</li>

        <li role="button" onClick={handleItemClick}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;