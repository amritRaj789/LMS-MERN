import React from "react";
import { Link, useNavigate } from "react-router";




const Navbar = ({user, setUser}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        
        // set user to null
        setUser(null);
        // remove token from localstorage
        localStorage.removeItem("token");
        // navigate to the homepage
        navigate('/');
        
    }

    return(
        <nav className="bg-sky-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg">Duckman</Link>
                <div>
                    {user ? 
                    (
                        <button className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700" onClick={handleLogout}>Logout</button>
                    ) 
                    : (
                        <>
                            <Link to="/login" className="text-white mx-2 hover:underline"> Login </Link>
                            <Link to="/register" className="text-white mx-2 hover:underline"> Register </Link>
                        </>
                        
                    )}
                </div>
            </div>
        </nav>
        
    )
}

export default Navbar;