const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get market prices (no auth required for viewing prices)
router.get('/', async (req, res) => {
  try {
    const { crop_name, location } = req.query;
    let query = 'SELECT * FROM market_prices WHERE 1=1';
    const params = [];

    if (crop_name) {
      query += ' AND crop_name LIKE ?';
      params.push(`%${crop_name}%`);
    }
    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    query += ' ORDER BY price_date DESC LIMIT 100';

    const [prices] = await db.execute(query, params);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add market price (admin or system)
router.post('/', async (req, res) => {
  try {
    const { crop_name, mandi_name, price_per_kg, price_date, location } = req.body;

    if (!crop_name || !mandi_name || !price_per_kg || !price_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.execute(
      'INSERT INTO market_prices (crop_name, mandi_name, price_per_kg, price_date, location) VALUES (?, ?, ?, ?, ?)',
      [crop_name, mandi_name, price_per_kg, price_date, location || null]
    );

    res.status(201).json({ message: 'Market price added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

