import React, { useState, useEffect } from 'react';
import { resourcesAPI, farmsAPI } from '../services/api';

const Resources = ({ user }) => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [resources, setResources] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadFarms();
  }, []);

  useEffect(() => {
    if (selectedFarm) {
      loadResources();
      loadSummary();
    }
  }, [selectedFarm]);

  const loadFarms = async () => {
    try {
      const data = await farmsAPI.getAll();
      setFarms(data);
      if (data.length > 0 && !selectedFarm) {
        setSelectedFarm(data[0].id);
      }
    } catch (err) {
      console.error('Error loading farms:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async () => {
    try {
      const data = await resourcesAPI.getByFarm(selectedFarm);
      setResources(data);
    } catch (err) {
      console.error('Error loading resources:', err);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await resourcesAPI.getSummary(selectedFarm);
      setSummary(data);
    } catch (err) {
      console.error('Error loading summary:', err);
    }
  };

  const handleCreateResource = async (resourceData) => {
    try {
      await resourcesAPI.create({ ...resourceData, farm_id: selectedFarm });
      await loadResources();
      await loadSummary();
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (farms.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <div className="empty-state">
            <h3>No farms found</h3>
            <p>Create a farm first to track resources</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Resource Management</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Record Resource Usage
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Select Farm: </label>
          <select
            className="form-control"
            style={{ width: 'auto', display: 'inline-block', marginLeft: '1rem' }}
            value={selectedFarm || ''}
            onChange={(e) => setSelectedFarm(parseInt(e.target.value))}
          >
            {farms.map(farm => (
              <option key={farm.id} value={farm.id}>{farm.farm_name}</option>
            ))}
          </select>
        </div>

        {summary.length > 0 && (
          <div className="card" style={{ marginBottom: '2rem', background: '#f8f9fa' }}>
            <h3 style={{ marginBottom: '1rem' }}>Resource Summary</h3>
            <div className="dashboard">
              {summary.map(item => (
                <div key={item.resource_type} className="dashboard-card">
                  <h3>{item.resource_type.charAt(0).toUpperCase() + item.resource_type.slice(1)}</h3>
                  <div className="stat">{parseFloat(item.total).toFixed(2)}</div>
                  <div className="stat-label">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Usage Records</h3>
          {resources.length === 0 ? (
            <div className="empty-state">No resource usage recorded yet</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Resource Type</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {resources.map(resource => (
                  <tr key={resource.id}>
                    <td>{resource.usage_date}</td>
                    <td>{resource.resource_type}</td>
                    <td>{resource.quantity}</td>
                    <td>{resource.unit}</td>
                    <td>{resource.notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <ResourceModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateResource}
        />
      )}
    </div>
  );
};

const ResourceModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    resource_type: 'water',
    quantity: '',
    unit: 'liters',
    usage_date: new Date().toISOString().split('T')[0],
    notes: '',
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

  const unitOptions = {
    water: ['liters', 'gallons', 'cubic meters'],
    fertilizer: ['kg', 'bags', 'tons'],
    pesticide: ['liters', 'ml', 'kg'],
    electricity: ['kWh', 'units'],
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Record Resource Usage</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Resource Type *</label>
              <select
                className="form-control"
                value={formData.resource_type}
                onChange={(e) => {
                  const newType = e.target.value;
                  setFormData({
                    ...formData,
                    resource_type: newType,
                    unit: unitOptions[newType]?.[0] || 'units',
                  });
                }}
                required
              >
                <option value="water">Water</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="pesticide">Pesticide</option>
                <option value="electricity">Electricity</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                className="form-control"
                value={formData.usage_date}
                onChange={(e) => setFormData({ ...formData, usage_date: e.target.value })}
                required
              />
            </div>
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
              <label>Unit *</label>
              <select
                className="form-control"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              >
                {unitOptions[formData.resource_type]?.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
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

export default Resources;

