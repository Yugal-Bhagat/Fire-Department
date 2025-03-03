// controllers/user.controller.js
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  // const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes.`;
try {
  await sendEmail({ email: user.email, subject: "Password Reset Request", message: resetUrl });
  res.json({ message: "Password reset email sent" });
  
} catch (error) {
  user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(500);
    throw new Error("Email could not be sent");
}
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const resetToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired token");
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
});

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
