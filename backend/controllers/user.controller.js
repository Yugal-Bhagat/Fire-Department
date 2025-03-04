// controllers/user.controller.js
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const hashPassword = require("../utils/hashPassword")
const crypto = require('crypto');
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, mobile, role });
  if (user) {
    res.status(201).json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, role: user.role, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// const forgotPassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//     }
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//     await user.save();
//     const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
//   // const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes.`;
// try {
//   await sendEmail({ email: user.email, subject: "Password Reset Request", message: resetUrl });
//   res.json({ message: "Password reset email sent" });

// } catch (error) {
//   user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.status(500);
//     throw new Error("Email could not be sent");
// }
// });

// const forgotPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) {
// //       return res.status(400).send({ message: "Please provide email" });
// //     }

// //     const checkUser = await User.findOne({ email });

// //     if (!checkUser) {
// //       return res
// //         .status(400)
// //         .send({ message: "User not found please register" });
// //     }
// // console.log("ramm ");

// //     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// // console.log("ramm ramm ",token);

// //     const transporter = nodemailer.createTransport({
// //       service: "gmail",
// //       secure: true,
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASSWORD,
// //       },
// //     });

// //     const receiver = {
// //       from: process.env.EMAIL_USER,
// //       to: email,
// //       subject: "Password Reset Request",
// //       text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
// //     };

// //     await transporter.sendMail(receiver);

// //     return res.status(200).send({
// //       message: "Password reset link send successfully on your gmail account",
// //     });
// //   } catch (error) {
// //     return res.status(500).send({ message: "Something went wrong" });
// //   }

// const {email} = req.body;
//     User.findOne({email: email})
//     .then(user => {
//         if(!user) {
//             return res.send({Status: "User not existed"})
//         } 
//         const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: process.env.EMAIL_USER,
//                       pass: process.env.EMAIL_PASSWORD,
//             }
//           });
          
//           var mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Reset Password Link',
//             // text:`Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token},
//             text: ` ${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               return res.send({Status: "Success"})
//             }
//           });
//     })
// };


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token for password reset
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      text: `Click on this link to reset your password: ${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send reset password email" });
      } else {
        return res.status(200).json({ message: "Reset password link sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
// const resetPassword = asyncHandler(async (req, res) => {
//     const { password } = req.body;
//     const resetToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
//     const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpire: { $gt: Date.now() } });
//     if (!user) {
//         res.status(400);
//         throw new Error("Invalid or expired token");
//     }
//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();
//     res.json({ message: "Password reset successful" });
// });

// const resetPassword = async (req, res) => {
//   // try {
//   //   const { token } = req.params;
//   //   const { password } = req.body;

//   //   if (!password) {
//   //     return res.status(400).send({ message: "Please provide password" });
//   //   }

//   //   const decode = jwt.verify(token, process.env.JWT_SECRET);

//   //   const user = await User.findOne({ email: decode.email });

//   //   const newhashPassword = await hashPassword(password);

//   //   user.password = newhashPassword;
//   //   await user.save();

//   //   return res.status(200).send({ message: "Password reset successfully" });
//   // } catch (error) {
//   //   return res.status(500).send({ message: "Something went wrong" ,error:error.message});
//   // }

//   const {id, token} = req.params
//     const {password} = req.body

//     jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
//         if(err) {
//             return res.json({Status: "Error with token"})
//         } else {
//             bcrypt.hash(password, 10)
//             .then(hash => {
//                 User.findByIdAndUpdate({_id: id}, {password: hash})
//                 .then(u => res.send({Status: "Success"}))
//                 .catch(err => res.send({Status: err}))
//             })
//             .catch(err => res.send({Status: err}))
//         }
//     })

// };

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token belongs to the user
    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
