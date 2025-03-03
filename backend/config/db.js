const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI); 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connection etablish successfuly !");
    } catch (error) {
        console.error(`mongoDB connection error : ${error.message}`);
        process.exit(1)
    }
}
module.exports =  connectDB 

// config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Export the connectDB function
// module.exports = connectDB;