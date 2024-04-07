import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.delete('https://expns-api.vercel.app/api/tokens/', {
        data: { refreshToken: refreshToken }
      });
      if (response.status === 200) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiryTime');
        navigate('/login');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
