import React, { useState, useEffect } from 'react';
import { marketPricesAPI } from '../services/api';

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [filters, setFilters] = useState({
    crop_name: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [prices, filters]);

  const loadPrices = async () => {
    try {
      const data = await marketPricesAPI.getAll();
      setPrices(data);
    } catch (err) {
      console.error('Error loading prices:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...prices];

    if (filters.crop_name) {
      filtered = filtered.filter(p =>
        p.crop_name.toLowerCase().includes(filters.crop_name.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(p =>
        p.location && p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Group by crop and show latest prices
    const grouped = {};
    filtered.forEach(price => {
      const key = `${price.crop_name}_${price.mandi_name}`;
      if (!grouped[key] || new Date(price.price_date) > new Date(grouped[key].price_date)) {
        grouped[key] = price;
      }
    });

    setFilteredPrices(Object.values(grouped).sort((a, b) =>
      new Date(b.price_date) - new Date(a.price_date)
    ));
  };

  if (loading) {
    return <div className="loading">Loading market prices...</div>;
  }

  // Group by crop for comparison
  const cropGroups = {};
  filteredPrices.forEach(price => {
    if (!cropGroups[price.crop_name]) {
      cropGroups[price.crop_name] = [];
    }
    cropGroups[price.crop_name].push(price);
  });

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Market Prices</h2>
        </div>

        <div className="form-row" style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label>Search by Crop</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Rice, Wheat, Potato"
              value={filters.crop_name}
              onChange={(e) => setFilters({ ...filters, crop_name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Filter by Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Delhi, Mumbai"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
        </div>

        {filteredPrices.length === 0 ? (
          <div className="empty-state">
            <h3>No prices found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div>
            {Object.keys(cropGroups).map(cropName => (
              <div key={cropName} className="card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>{cropName}</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Mandi Name</th>
                      <th>Price (₹/kg)</th>
                      <th>Location</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cropGroups[cropName]
                      .sort((a, b) => parseFloat(b.price_per_kg) - parseFloat(a.price_per_kg))
                      .map(price => (
                        <tr key={price.id}>
                          <td>{price.mandi_name}</td>
                          <td><strong>₹{price.price_per_kg}</strong></td>
                          <td>{price.location || 'N/A'}</td>
                          <td>{new Date(price.price_date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
                  <strong>Price Range:</strong> ₹{Math.min(...cropGroups[cropName].map(p => p.price_per_kg)).toFixed(2)} - ₹{Math.max(...cropGroups[cropName].map(p => p.price_per_kg)).toFixed(2)} per kg
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPrices;

