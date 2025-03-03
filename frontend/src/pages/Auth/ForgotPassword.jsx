import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // Start loading

    if (!email.trim()) {
      setMessage("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/forgot-password", { email });

      setMessage(response.data.message || "A password reset link has been sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p className="forgot-description">Enter your registered email to receive a password reset link.</p>

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
              disabled={loading}
            />
          </div>

          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
