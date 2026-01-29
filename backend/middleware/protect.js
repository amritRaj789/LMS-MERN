// This will include the express middleware to protect our routes
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    console.log("Inside protect function now");
    let token ;
    console.log("req.headers authorization: ", req.headers.authorization);

    // if authorization data is provided in the req headers, check if our JWT verifies it as correct
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        console.log("inside if statement...");
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("inside try block, token is: ", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded value is : ", decoded);
            req.user = await User.findById(decoded.id).select("-password"); // -password will hide the password 
            //console.log("req.user is: ", req.user);

            return next();
        } catch (error) {
            console.log("inside catch..Token verification failed: ", error.message);
            return res.status(401).json({message: "User not authorized!, token failed"});
        }
        
    }

    // if authorization data is not provided
    return res.status(401).json({message: "User not authorized"});


}