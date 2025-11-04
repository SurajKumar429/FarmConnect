import React, { useState, useEffect } from 'react';
import { marketplaceAPI, cropsAPI, farmsAPI } from '../services/api';

const Marketplace = ({ user }) => {
  const [listings, setListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadListings();
    loadMyListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await marketplaceAPI.getAll();
      setListings(data);
    } catch (err) {
      console.error('Error loading listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMyListings = async () => {
    try {
      const data = await marketplaceAPI.getMyListings();
      setMyListings(data);
    } catch (err) {
      console.error('Error loading my listings:', err);
    }
  };

  const handleCreateListing = async (listingData) => {
    try {
      await marketplaceAPI.create(listingData);
      await loadListings();
      await loadMyListings();
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading marketplace...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Marketplace</h2>
          {user.user_type === 'farmer' && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Create Listing
            </button>
          )}
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Listings
          </button>
          {user.user_type === 'farmer' && (
            <button
              className={`tab ${activeTab === 'my-listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-listings')}
            >
              My Listings
            </button>
          )}
        </div>

        {activeTab === 'browse' ? (
          <div>
            {listings.length === 0 ? (
              <div className="empty-state">
                <h3>No listings available</h3>
                <p>Be the first to create a listing!</p>
              </div>
            ) : (
              <div className="feature-grid">
                {listings.map(listing => (
                  <div key={listing.id} className="feature-card">
                    <h3>{listing.crop_name}</h3>
                    <p><strong>Seller:</strong> {listing.seller_name}</p>
                    <p><strong>Quantity:</strong> {listing.quantity} {listing.unit}</p>
                    <p><strong>Price:</strong> ₹{listing.price_per_kg}/kg</p>
                    <p><strong>Total:</strong> ₹{(listing.quantity * listing.price_per_kg).toFixed(2)}</p>
                    {listing.location && <p><strong>Location:</strong> {listing.location}</p>}
                    {listing.description && <p>{listing.description}</p>}
                    <button className="btn btn-success" style={{ marginTop: '1rem', width: '100%' }}>
                      Contact Seller
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {myListings.length === 0 ? (
              <div className="empty-state">
                <h3>No listings yet</h3>
                <p>Create your first listing to start selling!</p>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Quantity</th>
                    <th>Price/kg</th>
                    <th>Total Value</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {myListings.map(listing => (
                    <tr key={listing.id}>
                      <td>{listing.crop_name}</td>
                      <td>{listing.quantity} {listing.unit}</td>
                      <td>₹{listing.price_per_kg}</td>
                      <td>₹{(listing.quantity * listing.price_per_kg).toFixed(2)}</td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '5px',
                          background: listing.status === 'available' ? '#d4edda' : '#f8d7da',
                          color: listing.status === 'available' ? '#155724' : '#721c24'
                        }}>
                          {listing.status}
                        </span>
                      </td>
                      <td>{new Date(listing.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <ListingModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateListing}
        />
      )}
    </div>
  );
};

const ListingModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    crop_name: '',
    quantity: '',
    unit: 'kg',
    price_per_kg: '',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Listing</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Crop Name *</label>
            <input
              type="text"
              className="form-control"
              value={formData.crop_name}
              onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Unit</label>
              <select
                className="form-control"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="kg">kg</option>
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price per kg (₹) *</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={formData.price_per_kg}
                onChange={(e) => setFormData({ ...formData, price_per_kg: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Marketplace;

