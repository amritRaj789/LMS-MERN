import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router';

const Login = ({setUser}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("trying to login:", loginData);

    // we will add the post request here using either Fetch API or axios
    try{
      const res = await axios.post("/api/users/login", loginData);
      // storing token to access for authentication
      localStorage.setItem("token", res.data.token);
      // for debugging
      console.log("Inside handleLogin. Response data:", res.data);
      setUser(res.data);
      // going back to home
      navigate('/');
    } catch(err){
      setError(err.response?.data?.message || "Login Failed");
      // remove any token from prev login
      localStorage.removeItem("token");
      setLoginData({
        email: "",
        password: "",
      });
      window.alert("Incorrect Email/Password");
      //console.alert("Couldn't login, ", err.message);

    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={loginData.email} onChange={handleChange} autoComplete="off" required />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
      </div>

      <button className="btn-primary">Login</button>
      <button className="btn-secondary hover:bg-blue-100">Forgot Password?</button>
    </form>
  );
};

export default Login;
