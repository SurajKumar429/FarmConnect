const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get all farms for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [farms] = await db.execute(
      'SELECT * FROM farms WHERE user_id = ?',
      [req.user.id]
    );
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new farm
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { farm_name, area_acres, location, soil_type } = req.body;

    if (!farm_name) {
      return res.status(400).json({ error: 'Farm name is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO farms (user_id, farm_name, area_acres, location, soil_type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, farm_name, area_acres || null, location || null, soil_type || null]
    );

    res.status(201).json({ message: 'Farm created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get farm details with crops
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [farms] = await db.execute(
      'SELECT * FROM farms WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (farms.length === 0) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    const [crops] = await db.execute(
      'SELECT * FROM crops WHERE farm_id = ?',
      [req.params.id]
    );

    res.json({ ...farms[0], crops });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

