import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    // Simulate API Call
    setTimeout(() => {
      setMessage("A password reset link has been sent to your email.");
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p className="forgot-description">
          Enter your registered email to receive a password reset link.
        </p>

        {message && <p className="response-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="forgot-button">Send Reset Link</button>
        </form>

        <div className="back-to-login">
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;