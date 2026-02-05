import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {toast, Bounce, Zoom} from 'react-toastify';

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

  const validateForm = (data) => {
    let {password, phone, address} = data;
    // html forms is already doing email check, may skip
    // if(!email.includes('@') || !email.includes('.com')) return "Please check Email Id";
    if(password.length < 9) return "Password must be longer than 8 characters";
    if(phone[0] == '0') return "Phone cannot start with 0";
    if(phone.length != 10) return "Phone must be 10 characters long";
    if(isNaN(phone)) return "Phone must be all numerical";
    if(address.trim().length == 0) return "Please check Address";

    return "All correct";

  }

  const showToastMsg = (type, msg) => {
    if(type == 'validation'){
      toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
    }
    else if(type == 'server'){
      toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
    }
    else if(type == 'success'){
      toast.success(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
      });
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleRegister = async (e) => {

    e.preventDefault();
    console.log("Inside handleRegister : ", formData);

    // validate form first
    const formValidationMsg = validateForm(formData);

    if(formValidationMsg != "All correct"){
      // show toast with proper msg
      showToastMsg('validation', formValidationMsg);
    }
    else{
      try {
        const res = await axios.post('/api/users/register', formData);

        console.log("response object: ", res.data);
        
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
        
        // show toast on success
        showToastMsg('success', 'User registered successfully!');

        navigate('/');
      } catch (err) {
        //console.log("Couldn't Register User. Error obj", err);

        const errMsg = err.response?.data?.message || undefined;
        errMsg == "User already exists!" ? 
          (showToastMsg('server', 'Email Id already registered!')) 
          : (showToastMsg('server', 'Server Error! Try again!')) ;
      }
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
      <button type="button" className="btn-secondary hover:bg-blue-100" onClick={() => navigate('/login')}>Already Registered? Login</button>
    </form>
  );
};

export default Register;
