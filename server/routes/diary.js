const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get all diary entries for a farm
router.get('/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [entries] = await db.execute(
      'SELECT * FROM farm_diary WHERE farm_id = ? ORDER BY entry_date DESC',
      [req.params.farmId]
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new diary entry
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { farm_id, entry_date, activity_type, description, weather_notes } = req.body;

    if (!farm_id || !entry_date || !description) {
      return res.status(400).json({ error: 'Farm ID, entry date, and description are required' });
    }

    // Verify farm belongs to user
    const [farms] = await db.execute('SELECT * FROM farms WHERE id = ? AND user_id = ?', [farm_id, req.user.id]);
    if (farms.length === 0) {
      return res.status(403).json({ error: 'Farm not found or access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO farm_diary (farm_id, entry_date, activity_type, description, weather_notes) VALUES (?, ?, ?, ?, ?)',
      [farm_id, entry_date, activity_type || null, description, weather_notes || null]
    );

    res.status(201).json({ message: 'Diary entry added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

