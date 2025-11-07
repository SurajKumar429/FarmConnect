import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Farms from './components/Farms';
import Marketplace from './components/Marketplace';
import MarketPrices from './components/MarketPrices';
import Learning from './components/Learning';
import Resources from './components/Resources';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import BuyerDashboard from './components/BuyerDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {user && <Header user={user} onLogout={handleLogout} />}
        <Routes>
          <Route 
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home/>}>
            
          </Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/farms"
            element={user ? <Farms user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/marketplace"
            element={user ? <Marketplace user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/market-prices"
            element={<MarketPrices />}
          />
          <Route
            path="/learning"
            element={user ? <Learning user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/resources"
            element={user ? <Resources user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/buyer-dashboard"
            element={
            user ? (
           user.user_type === 'buyer' ? (
           <BuyerDashboard />
            ) : (
           <Navigate to="/dashboard" />
           )
            ) : (
          <Navigate to="/login" />
          )
          }
         />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
