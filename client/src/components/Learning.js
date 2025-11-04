import React, { useState, useEffect } from 'react';
import { learningAPI } from '../services/api';

const Learning = ({ user }) => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [progress, setProgress] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    content_type: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
    loadProgress();
  }, []);

  useEffect(() => {
    loadResources();
  }, [filters]);

  const loadResources = async () => {
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.content_type) params.content_type = filters.content_type;
      const data = await learningAPI.getAll(params);
      setResources(data);
    } catch (err) {
      console.error('Error loading resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const data = await learningAPI.getMyProgress();
      const progressMap = {};
      data.forEach(p => {
        progressMap[p.resource_id] = p;
      });
      setProgress(progressMap);
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  };

  const handleProgressUpdate = async (resourceId, status, percentage) => {
    try {
      await learningAPI.updateProgress({
        resource_id: resourceId,
        status,
        progress_percentage: percentage,
      });
      await loadProgress();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const getProgressStatus = (resourceId) => {
    return progress[resourceId] || { status: 'not_started', progress_percentage: 0 };
  };

  if (loading) {
    return <div className="loading">Loading learning resources...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">E-Learning Platform</h2>
        </div>

        <div className="form-row" style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label>Filter by Category</label>
            <select
              className="form-control"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="Crop Management">Crop Management</option>
              <option value="Soil Health">Soil Health</option>
              <option value="Water Management">Water Management</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Organic Farming">Organic Farming</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="form-group">
            <label>Filter by Type</label>
            <select
              className="form-control"
              value={filters.content_type}
              onChange={(e) => setFilters({ ...filters, content_type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="tutorial">Tutorial</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>

        {selectedResource ? (
          <ResourceDetail
            resource={selectedResource}
            progress={getProgressStatus(selectedResource.id)}
            onBack={() => setSelectedResource(null)}
            onProgressUpdate={handleProgressUpdate}
          />
        ) : (
          <div>
            {resources.length === 0 ? (
              <div className="empty-state">
                <h3>No resources found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="feature-grid">
                {resources.map(resource => {
                  const prog = getProgressStatus(resource.id);
                  return (
                    <div
                      key={resource.id}
                      className="feature-card"
                      onClick={() => setSelectedResource(resource)}
                    >
                      <div className="feature-card-icon">
                        {resource.content_type === 'video' ? '📹' : '📄'}
                      </div>
                      <h3>{resource.title}</h3>
                      <p><strong>Category:</strong> {resource.category || 'General'}</p>
                      <p><strong>Type:</strong> {resource.content_type}</p>
                      <div style={{ marginTop: '1rem' }}>
                        <div style={{ background: '#f0f0f0', borderRadius: '5px', height: '8px', marginBottom: '0.5rem' }}>
                          <div
                            style={{
                              background: '#667eea',
                              height: '100%',
                              width: `${prog.progress_percentage}%`,
                              borderRadius: '5px',
                              transition: 'width 0.3s',
                            }}
                          />
                        </div>
                        <small>{prog.progress_percentage}% Complete - {prog.status}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ResourceDetail = ({ resource, progress, onBack, onProgressUpdate }) => {
  const [currentProgress, setCurrentProgress] = useState(progress.progress_percentage);

  const handleProgressChange = (percentage) => {
    setCurrentProgress(percentage);
    const status = percentage === 100 ? 'completed' : percentage > 0 ? 'in_progress' : 'not_started';
    onProgressUpdate(resource.id, status, percentage);
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '1rem' }}>
        ← Back to Resources
      </button>
      <div className="card">
        <h2>{resource.title}</h2>
        <p><strong>Category:</strong> {resource.category || 'General'}</p>
        <p><strong>Type:</strong> {resource.content_type}</p>
        {resource.tags && <p><strong>Tags:</strong> {resource.tags}</p>}

        <div style={{ margin: '1.5rem 0' }}>
          <label>Progress: {currentProgress}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentProgress}
            onChange={(e) => handleProgressChange(parseInt(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => handleProgressChange(0)}
              style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
            >
              Reset
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleProgressChange(100)}
              style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
            >
              Mark Complete
            </button>
          </div>
        </div>

        {resource.video_url ? (
          <div style={{ marginTop: '2rem' }}>
            <h3>Video Content</h3>
            <iframe
              width="100%"
              height="400"
              src={resource.video_url}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <h3>Content</h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>
              {resource.content || 'No content available.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;

