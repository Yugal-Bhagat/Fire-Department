import React from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>User Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, User!</h1>
        </div>

        {/* Content Area */}
        <div className="content">
          <div className="card">
            <h3>Your Stats</h3>
            <p>Check your recent activity and performance.</p>
          </div>
          <div className="card">
            <h3>Notifications</h3>
            <p>You have 3 new notifications.</p>
          </div>
          <div className="card">
            <h3>Quick Actions</h3>
            <ul>
              <li>
                <Link to="/profile">Update Profile</Link>
              </li>
              <li>
                <Link to="/settings">Change Password</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;