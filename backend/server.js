import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import {rateLimit} from 'express-rate-limit';

import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8800;

// general limiter
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 10 requests per window
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// authentication limiter
// const authLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	limit: 5,
// 	standardHeaders: 'draft-8',
// 	legacyHeaders: false,
// 	ipv6Subnet: 56,
// })

// passwordChange limiter
// const strictLimiter = rateLimit({
// 	windowMs: 60 * 60 * 1000, // 1 hr window
// 	limit: 3,
// 	standardHeaders: 'draft-8',
// 	legacyHeaders: false,
// 	ipv6Subnet: 56,
// })

const app = express();


// rate-limited middleware
app.use(limiter);
// app.use('/api/users/login', authLimiter);
// app.use('/api/users/register', authLimiter);
// app.use('/api/users/password-change', strictLimiter);

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