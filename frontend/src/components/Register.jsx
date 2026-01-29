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

  const validateForm = (data) => {
    let {email, password, phone, address} = data;
    // html forms is already doing this, may skip
    // if(!email.includes('@') || !email.includes('.com')) return "Please check Email Id";
    if(password.length < 9) return "Password must be longer than 8 characters";
    if(phone[0] == '0') return "Phone cannot start with 0";
    if(phone.length != 10) return "Phone must be 10 characters long";
    if(isNaN(phone)) return "Phone must be all numerical";
    if(address.trim().length == 0) return "Please check Address";

    return "All correct";

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
    // console.log("validation message", formValidationMsg);
    if(formValidationMsg != "All correct"){
      window.alert(formValidationMsg);
    }
    else{
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
