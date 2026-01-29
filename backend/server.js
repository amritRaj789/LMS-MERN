import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8800;

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// using our routes that we have in separate files
app.use('/api/users', authRoutes);


// testing get request
app.get('/home', (req, res) => {
    res.status(200).json({message: "Welcome to our login page"});
})

// connect to database
connectDB();

app.listen(PORT, () => {
    console.log("server started at port: ", PORT);
});