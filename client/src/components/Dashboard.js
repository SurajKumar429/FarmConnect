import React, { useState, useEffect } from 'react';
import { farmsAPI, expensesAPI, yieldAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    farms: 0,
    totalExpenses: 0,
    totalYield: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const farms = await farmsAPI.getAll();
      let totalExpenses = 0;
      let totalYield = 0;

      for (const farm of farms) {
        try {
          const expenses = await expensesAPI.getByFarm(farm.id);
          totalExpenses += expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
        } catch (err) {}

        try {
          const farmData = await farmsAPI.getById(farm.id);
          if (farmData.crops) {
            for (const crop of farmData.crops) {
              try {
                const yields = await yieldAPI.getByCrop(crop.id);
                totalYield += yields.reduce((sum, y) => sum + parseFloat(y.quantity || 0), 0);
              } catch (err) {}
            }
          }
        } catch (err) {}
      }

      setStats({
        farms: farms.length,
        totalExpenses: totalExpenses.toFixed(2),
        totalYield: totalYield.toFixed(2),
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Welcome, {user.name}! 👋</h1>
      
      <div className="dashboard">
        <div className="dashboard-card">
          <h3>My Farms</h3>
          <div className="stat">{stats.farms}</div>
          <div className="stat-label">Total Farms</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Expenses</h3>
          <div className="stat">₹{stats.totalExpenses}</div>
          <div className="stat-label">All Time</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Yield</h3>
          <div className="stat">{stats.totalYield} kg</div>
          <div className="stat-label">Harvested</div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-card-icon">🏡</div>
          <h3>Farm Management</h3>
          <p>Manage your farms, crops, and track all your agricultural activities in one place.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">💰</div>
          <h3>Marketplace</h3>
          <p>Buy and sell produce directly with buyers. Get the best prices for your crops.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📊</div>
          <h3>Market Prices</h3>
          <p>Compare prices across different mandis and make informed selling decisions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🌱</div>
          <h3>Sustainability</h3>
          <p>Track water, fertilizer, and resource usage to promote sustainable farming.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📚</div>
          <h3>E-Learning</h3>
          <p>Access farming knowledge, tutorials, and best practices to improve your skills.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📝</div>
          <h3>Farm Diary</h3>
          <p>Keep a digital diary of daily activities, weather, and important observations.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

