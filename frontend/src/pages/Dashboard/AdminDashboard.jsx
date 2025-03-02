import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/manage-users">Manage Users</Link>
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
          <h1>Welcome, Admin!</h1>
        </div>

        {/* Content Area */}
        <div className="content">
          <div className="card">
            <h3>System Overview</h3>
            <p>Total Users: 1,234</p>
            <p>Active Sessions: 56</p>
          </div>
          <div className="card">
            <h3>Recent Activity</h3>
            <ul>
              <li>User "JohnDoe" logged in.</li>
              <li>User "JaneDoe" updated their profile.</li>
              <li>New user registered.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Quick Actions</h3>
            <ul>
              <li>
                <Link to="/manage-users">Manage Users</Link>
              </li>
              <li>
                <Link to="/settings">Update Settings</Link>
              </li>
              <li>
                <Link to="/reports">View Reports</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;