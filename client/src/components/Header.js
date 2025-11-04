import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <h1>🌾 FarmConnect</h1>
      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/farms">My Farms</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/market-prices">Market Prices</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/learning">Learning</Link>
        <div className="header-user">
          <span>Welcome, {user?.name}</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

