import React, { useState, useEffect } from 'react';
import { farmsAPI, cropsAPI, expensesAPI, diaryAPI, yieldAPI } from '../services/api';

const Farms = ({ user }) => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    loadFarms();
  }, []);

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

  const handleCreateFarm = async (farmData) => {
    try {
      await farmsAPI.create(farmData);
      await loadFarms();
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading farms...</div>;
  }

  const currentFarm = farms.find(f => f.id === selectedFarm);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Farms</h2>
          <button className="btn btn-primary" onClick={() => { setModalType('farm'); setShowModal(true); }}>
            + Add Farm
          </button>
        </div>

        {farms.length === 0 ? (
          <div className="empty-state">
            <h3>No farms yet</h3>
            <p>Create your first farm to get started!</p>
          </div>
        ) : (
          <>
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

            {currentFarm && (
              <>
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`tab ${activeTab === 'crops' ? 'active' : ''}`}
                    onClick={() => setActiveTab('crops')}
                  >
                    Crops
                  </button>
                  <button
                    className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expenses')}
                  >
                    Expenses
                  </button>
                  <button
                    className={`tab ${activeTab === 'diary' ? 'active' : ''}`}
                    onClick={() => setActiveTab('diary')}
                  >
                    Diary
                  </button>
                  <button
                    className={`tab ${activeTab === 'yield' ? 'active' : ''}`}
                    onClick={() => setActiveTab('yield')}
                  >
                    Yield
                  </button>
                </div>

                <FarmTabContent
                  farm={currentFarm}
                  tab={activeTab}
                  onModalOpen={(type) => { setModalType(type); setShowModal(true); }}
                />
              </>
            )}
          </>
        )}
      </div>

      {showModal && (
        <FarmModal
          type={modalType}
          farmId={selectedFarm}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateFarm}
          onSuccess={() => { setShowModal(false); loadFarms(); }}
        />
      )}
    </div>
  );
};

const FarmTabContent = ({ farm, tab, onModalOpen }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [farm.id, tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      let result = [];
      switch (tab) {
        case 'crops':
          result = await cropsAPI.getByFarm(farm.id);
          break;
        case 'expenses':
          result = await expensesAPI.getByFarm(farm.id);
          break;
        case 'diary':
          result = await diaryAPI.getByFarm(farm.id);
          break;
        case 'yield':
          const crops = await cropsAPI.getByFarm(farm.id);
          const yields = [];
          for (const crop of crops) {
            try {
              const cropYields = await yieldAPI.getByCrop(crop.id);
              yields.push(...cropYields.map(y => ({ ...y, crop_name: crop.crop_name })));
            } catch (err) {}
          }
          result = yields;
          break;
        default:
          const farmData = await farmsAPI.getById(farm.id);
          result = [farmData];
      }
      setData(result);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (tab === 'overview') {
    return (
      <div>
        <h3>{farm.farm_name}</h3>
        <p><strong>Area:</strong> {farm.area_acres || 'N/A'} acres</p>
        <p><strong>Location:</strong> {farm.location || 'N/A'}</p>
        <p><strong>Soil Type:</strong> {farm.soil_type || 'N/A'}</p>
      </div>
    );
  }

  if (tab === 'crops') {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => onModalOpen('crop')} style={{ marginBottom: '1rem' }}>
          + Add Crop
        </button>
        {data.length === 0 ? (
          <div className="empty-state">No crops added yet</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Variety</th>
                <th>Planting Date</th>
                <th>Expected Harvest</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(crop => (
                <tr key={crop.id}>
                  <td>{crop.crop_name}</td>
                  <td>{crop.variety || 'N/A'}</td>
                  <td>{crop.planting_date || 'N/A'}</td>
                  <td>{crop.expected_harvest_date || 'N/A'}</td>
                  <td>{crop.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  if (tab === 'expenses') {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => onModalOpen('expense')} style={{ marginBottom: '1rem' }}>
          + Add Expense
        </button>
        {data.length === 0 ? (
          <div className="empty-state">No expenses recorded yet</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.expense_date}</td>
                  <td>{expense.expense_type}</td>
                  <td>₹{expense.amount}</td>
                  <td>{expense.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  if (tab === 'diary') {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => onModalOpen('diary')} style={{ marginBottom: '1rem' }}>
          + Add Entry
        </button>
        {data.length === 0 ? (
          <div className="empty-state">No diary entries yet</div>
        ) : (
          <div>
            {data.map(entry => (
              <div key={entry.id} className="card" style={{ marginBottom: '1rem' }}>
                <h4>{entry.entry_date}</h4>
                <p><strong>Activity:</strong> {entry.activity_type || 'N/A'}</p>
                <p>{entry.description}</p>
                {entry.weather_notes && <p><strong>Weather:</strong> {entry.weather_notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (tab === 'yield') {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => onModalOpen('yield')} style={{ marginBottom: '1rem' }}>
          + Add Yield Record
        </button>
        {data.length === 0 ? (
          <div className="empty-state">No yield records yet</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Harvest Date</th>
                <th>Quality</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map(yieldRecord => (
                <tr key={yieldRecord.id}>
                  <td>{yieldRecord.crop_name}</td>
                  <td>{yieldRecord.quantity}</td>
                  <td>{yieldRecord.unit}</td>
                  <td>{yieldRecord.harvest_date}</td>
                  <td>{yieldRecord.quality_rating ? '⭐'.repeat(yieldRecord.quality_rating) : 'N/A'}</td>
                  <td>{yieldRecord.notes || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return null;
};

const FarmModal = ({ type, farmId, onClose, onSubmit, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    if (type === 'yield' && farmId) {
      loadCrops();
    }
  }, [type, farmId]);

  const loadCrops = async () => {
    try {
      const data = await cropsAPI.getByFarm(farmId);
      setCrops(data);
    } catch (err) {
      console.error('Error loading crops:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'farm') {
        await onSubmit(formData);
      } else {
        const api = {
          crop: cropsAPI,
          expense: expensesAPI,
          diary: diaryAPI,
          yield: yieldAPI,
        }[type];
        if (api) {
          await api.create({ ...formData, farm_id: farmId });
          onSuccess();
        }
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'farm':
        return (
          <>
            <div className="form-group">
              <label>Farm Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.farm_name || ''}
                onChange={(e) => setFormData({ ...formData, farm_name: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Area (acres)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.area_acres || ''}
                  onChange={(e) => setFormData({ ...formData, area_acres: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Soil Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.soil_type || ''}
                  onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </>
        );
      case 'crop':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Crop Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.crop_name || ''}
                  onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Variety</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.variety || ''}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Planting Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.planting_date || ''}
                  onChange={(e) => setFormData({ ...formData, planting_date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Expected Harvest Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.expected_harvest_date || ''}
                  onChange={(e) => setFormData({ ...formData, expected_harvest_date: e.target.value })}
                />
              </div>
            </div>
          </>
        );
      case 'expense':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Expense Type *</label>
                <select
                  className="form-control"
                  value={formData.expense_type || ''}
                  onChange={(e) => setFormData({ ...formData, expense_type: e.target.value })}
                  required
                >
                  <option value="">Select type</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="pesticide">Pesticide</option>
                  <option value="labor">Labor</option>
                  <option value="equipment">Equipment</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.expense_date || ''}
                  onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );
      case 'diary':
        return (
          <>
            <div className="form-group">
              <label>Entry Date *</label>
              <input
                type="date"
                className="form-control"
                value={formData.entry_date || ''}
                onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Activity Type</label>
              <input
                type="text"
                className="form-control"
                value={formData.activity_type || ''}
                onChange={(e) => setFormData({ ...formData, activity_type: e.target.value })}
                placeholder="e.g., Planting, Irrigation, Harvesting"
              />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Weather Notes</label>
              <textarea
                className="form-control"
                rows="2"
                value={formData.weather_notes || ''}
                onChange={(e) => setFormData({ ...formData, weather_notes: e.target.value })}
              />
            </div>
          </>
        );
      case 'yield':
        return (
          <>
            <div className="form-group">
              <label>Select Crop *</label>
              <select
                className="form-control"
                value={formData.crop_id || ''}
                onChange={(e) => setFormData({ ...formData, crop_id: e.target.value })}
                required
              >
                <option value="">Select a crop</option>
                {crops.map(crop => (
                  <option key={crop.id} value={crop.id}>{crop.crop_name} {crop.variety ? `(${crop.variety})` : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select
                  className="form-control"
                  value={formData.unit || 'kg'}
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
                <label>Harvest Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.harvest_date || ''}
                  onChange={(e) => setFormData({ ...formData, harvest_date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Quality Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="form-control"
                  value={formData.quality_rating || ''}
                  onChange={(e) => setFormData({ ...formData, quality_rating: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderForm()}
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

export default Farms;

