import React from 'react';
    import { Link } from 'react-router-dom';

    function LoginPage() {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-gray-600">Please Login to Continue.</p>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="mr-2 leading-tight"
                  />
                  <label className="text-sm" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                type="button"
              >
                Login
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  New User? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register Here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
    }

    export default LoginPage;
