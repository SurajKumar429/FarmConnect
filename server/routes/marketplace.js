const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');



// Get all marketplace listings (with seller contact info)
router.get('/', async (req, res) => {
  try {
    const [listings] = await db.execute(
      `SELECT 
         m.*, 
         u.name AS seller_name, 
         u.email AS seller_email, 
         u.phone AS seller_phone, 
         u.location AS seller_location 
       FROM marketplace_listings m 
       JOIN users u ON m.seller_id = u.id 
       WHERE m.status = 'available' 
       ORDER BY m.created_at DESC`
    );
    res.json(listings);
  } catch (error) {
    console.error('Error fetching marketplace listings:', error);
    res.status(500).json({ error: error.message });
  }
});


// Get user's listings
router.get('/my-listings', authenticateToken, async (req, res) => {
  try {
    const [listings] = await db.execute(
      'SELECT * FROM marketplace_listings WHERE seller_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new listing
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { crop_id, crop_name, quantity, unit, price_per_kg, location, description } = req.body;

    if (!crop_name || !quantity || !price_per_kg) {
      return res.status(400).json({ error: 'Crop name, quantity, and price are required' });
    }

    const [result] = await db.execute(
      'INSERT INTO marketplace_listings (seller_id, crop_id, crop_name, quantity, unit, price_per_kg, location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, crop_id || null, crop_name, quantity, unit || 'kg', price_per_kg, location || null, description || null]
    );

    res.status(201).json({ message: 'Listing created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;