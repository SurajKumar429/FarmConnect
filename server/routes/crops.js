const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get all crops for a farm
router.get('/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [crops] = await db.execute(
      'SELECT c.* FROM crops c JOIN farms f ON c.farm_id = f.id WHERE c.farm_id = ? AND f.user_id = ?',
      [req.params.farmId, req.user.id]
    );
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new crop
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { farm_id, crop_name, variety, planting_date, expected_harvest_date, status } = req.body;

    if (!farm_id || !crop_name) {
      return res.status(400).json({ error: 'Farm ID and crop name are required' });
    }

    // Verify farm belongs to user
    const [farms] = await db.execute('SELECT * FROM farms WHERE id = ? AND user_id = ?', [farm_id, req.user.id]);
    if (farms.length === 0) {
      return res.status(403).json({ error: 'Farm not found or access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO crops (farm_id, crop_name, variety, planting_date, expected_harvest_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [farm_id, crop_name, variety || null, planting_date || null, expected_harvest_date || null, status || 'planted']
    );

    res.status(201).json({ message: 'Crop added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

