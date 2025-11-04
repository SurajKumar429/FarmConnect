const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get yield records for a crop
router.get('/crop/:cropId', authenticateToken, async (req, res) => {
  try {
    const [yields] = await db.execute(
      `SELECT y.* FROM yield_records y 
       JOIN crops c ON y.crop_id = c.id 
       JOIN farms f ON c.farm_id = f.id 
       WHERE y.crop_id = ? AND f.user_id = ? 
       ORDER BY y.harvest_date DESC`,
      [req.params.cropId, req.user.id]
    );
    res.json(yields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new yield record
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { crop_id, quantity, unit, harvest_date, quality_rating, notes } = req.body;

    if (!crop_id || !quantity || !harvest_date) {
      return res.status(400).json({ error: 'Crop ID, quantity, and harvest date are required' });
    }

    // Verify crop belongs to user
    const [crops] = await db.execute(
      'SELECT c.* FROM crops c JOIN farms f ON c.farm_id = f.id WHERE c.id = ? AND f.user_id = ?',
      [crop_id, req.user.id]
    );
    if (crops.length === 0) {
      return res.status(403).json({ error: 'Crop not found or access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO yield_records (crop_id, quantity, unit, harvest_date, quality_rating, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [crop_id, quantity, unit || 'kg', harvest_date, quality_rating || null, notes || null]
    );

    res.status(201).json({ message: 'Yield record added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

