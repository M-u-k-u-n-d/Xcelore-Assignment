import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
const CreateUser = () => {
    const url=import.meta.env.YOUR_BACKEND_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: 'user', // Default role is 'user'
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
    
    axios.post(import.meta.env.VITE_APP_BACKEND_URL+"/signup", formData)
      .then(response => {
        navigate('/fadmin');
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 409) {
            setError('User already exists');
          } else if (error.response.status === 411) {
            setError('Invalid input');
          } else if (error.response.status === 500) {
            setError('Internal server error');
          } else {
            setError('An unexpected error occurred');
          }
        } else if (error.request) {
          setError('No response from the server');
        } else {
          setError('Error in setting up the request');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create new User</h2>
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
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Role</span>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
