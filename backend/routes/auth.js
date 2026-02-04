import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/protect.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Registering a user
router.post('/register', async (req, res) => {

    const {username, email, password, phone, address} = req.body;
    try {

        // if some field is missing
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"})
        }

        // also check if user is already there in database
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists!"});
        }

        // if no user, then create a new user to be stored
        const user = await User.create({username, email, password, phone, address}); //used destructuring
        const token = generateToken(user._id);

        console.log("The generated token was: ", token);
        
        res.status(201).json({
            id: user._id,
            email: user.email,
            username: user.username,
            token: token,
            phone: phone,
            address: address
        })

    } catch (error) {
        res.status(500).json({message: "Server Error!"});        
    }
})


// Login route
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(`the request body fields: ${email} , ${password}`);
    try {
        // check if email or password is missing
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields!"});
        }
        
        // retrieve user from DB
        const user = await User.findOne({email: email});
        //console.log("Retrieved user from db: ", user);

        // check if user exists and password is correct
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message: "Invalid credentials"});
        }

        // if all is good, generate a token
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            token: token
        });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
        console.log("The error in catch block was: ", error.message);
    }
})

// Route to handle userName change
router.post('/update', async (req, res) => {
    const {username, id} = req.body;

    console.log(`the request body fields: ${username} ${id}`);
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    try {
        // update the Db first
        const updatedUser = await User.findByIdAndUpdate(id, {username},{ new: true});
        // then send the new user back
        res.status(200).json({
            username: updatedUser.username
        });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
        console.log("The error in catch block was: ", error.message);
    }
})

// route for password change
router.post('/password-change', async (req, res) => {
    const {oldPassword, newPassword, email} = req.body;
    console.log("The request body is: ", req.body);
    console.log(`the request body fields: ${oldPassword} ${newPassword} ${email}`);

    try {
        console.log("Inside try block of password-change route");
        // retrieve user from DB
        const user = await User.findOne({email: email});
        console.log("Retrieved user from db: ", user);

        // check if user exists and password is correct
        if(!user || !(await user.matchPassword(oldPassword))){
            return res.status(401).json({message: "Invalid credentials"});
        }
        // hash and save the new password
        const result = await user.updatePassword(newPassword);
        console.log("Result is: ", result);
        res.status(200).json({message: "Password changed successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error while updating password"});
        console.log("Error in catch block: ", error);
    }

})

// route for logged in user
// we will have to protect our routes and for that we will be using a middleware
router.get('/self', protect, async (req, res) => {
    res.status(200).json(req.user);
})

// helper method to generate JWT; we will have to use this function every time a user logs in or registers
const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: "1d"} );
}
// the secret key ensures no one else can create fake tokens


export default router;