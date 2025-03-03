// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const cors = require("cors")
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

connectDB();

const app = express();
// Middleware
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("welcome to home page")
})
// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});