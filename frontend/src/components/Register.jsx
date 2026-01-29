import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = ({setUser}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  //const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Inside handleRegister : ", formData);

    try {
      const res = await axios.post('/api/users/register', formData);

      console.log("response object: ", res.data);
      
      setUser(res.data);
      localStorage.setItem("token", res.data.token);
      
      navigate('/');
    } catch (err) {
      // may also setError
      console.log("Couldn't Register User. ", err.message);
      //setError(err.response?.data?.message || "Registration Failed");
    }
  };

  

  return (
    <form className="form" onSubmit={handleRegister}>
      <div className="form-group">
        <label>User Name</label>
        <input name="username" value={formData.username} onChange={handleChange} autoComplete="off" required />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off" required />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off" required />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input name="phone" value={formData.phone} autoComplete="off" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Address</label>
        <textarea name="address" value={formData.address} autoComplete="off" onChange={handleChange} />
      </div>

      <button className="btn-primary">Register</button>
      <button className="login btn-secondary" onClick={() => navigate('/login')}>Already Registered? Login</button>
    </form>
  );
};

export default Register;
