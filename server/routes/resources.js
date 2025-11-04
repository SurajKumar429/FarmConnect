const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get resource usage for a farm
router.get('/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [resources] = await db.execute(
      `SELECT r.* FROM resource_usage r 
       JOIN farms f ON r.farm_id = f.id 
       WHERE r.farm_id = ? AND f.user_id = ? 
       ORDER BY r.usage_date DESC`,
      [req.params.farmId, req.user.id]
    );
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new resource usage record
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { farm_id, resource_type, quantity, unit, usage_date, notes } = req.body;

    if (!farm_id || !resource_type || !quantity || !unit || !usage_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Verify farm belongs to user
    const [farms] = await db.execute('SELECT * FROM farms WHERE id = ? AND user_id = ?', [farm_id, req.user.id]);
    if (farms.length === 0) {
      return res.status(403).json({ error: 'Farm not found or access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO resource_usage (farm_id, resource_type, quantity, unit, usage_date, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [farm_id, resource_type, quantity, unit, usage_date, notes || null]
    );

    res.status(201).json({ message: 'Resource usage recorded successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get resource summary by type
router.get('/summary/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [summary] = await db.execute(
      `SELECT resource_type, SUM(quantity) as total, unit FROM resource_usage r 
       JOIN farms f ON r.farm_id = f.id 
       WHERE r.farm_id = ? AND f.user_id = ? 
       GROUP BY resource_type, unit`,
      [req.params.farmId, req.user.id]
    );
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

