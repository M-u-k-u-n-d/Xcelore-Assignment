import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios.post(import.meta.env.VITE_APP_BACKEND_URL+"/signin", formData)
      .then(response => {
       const{role,token}=response.data;
        console.log(role);
        console.log('token', token  );
        localStorage.setItem("token",token);
        localStorage.setItem("role",role);
        if (role === 'admin') {
          navigate('/fadmin');
        } else {
          navigate('/fuser');
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 404) {
            setError('User not found');
          } else if (error.response.status === 401) {
            setError('Invalid credentials');
          } else if (error.response.status === 411) {
            setError('Invalid input');
          } else if (error.response.status === 500) {
            setError('Internal server error');
          } else {
            setError('An unexpected error occurred');
          }
        }
        else{
          setError('An unexpected error occurred');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
