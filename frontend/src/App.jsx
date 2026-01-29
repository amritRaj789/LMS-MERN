import { useEffect, useState } from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router';
import axios from 'axios';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/dashboard/Dashboard";



function App (){
  const [user, setUser] = useState(null);  
  const [error, setError] = useState(''); // I am not using it yet to display anything
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if(token){
        try {
          const res = await axios.get("/api/users/self", {
            headers: {Authorization: `Bearer ${token}`},
          });
          setUser(res.data);
        } catch (error) {
          setError("Couldn't fetch user data...", error.message);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [])

  // this is to ensure nothing else is visible when our components are loading
  if(isLoading){
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">

      </div>
    )
  }

  return(
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user} error={error}/>}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser}/>}></Route>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser}/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  )
}


export default App;




