// server/routes/buyer.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // adjust path to your db pool
const authenticateToken = require('../middleware/auth'); // your JWT middleware

// GET /api/buyer/marketplaces
// Returns marketplace listings joined with seller contact info
router.get('/marketplaces', authenticateToken, (req, res) => {
  // Optional: allow filters via query (crop_name, location)
  const { crop_name, location } = req.query;
  let sql = `
    SELECT ml.id, ml.seller_id, ml.crop_name, ml.quantity, ml.price_per_kg,
           ml.created_at,
           u.name AS seller_name, u.email AS seller_email, u.phone AS seller_phone, u.location AS seller_location
    FROM marketplace_listings ml
    JOIN users u ON ml.seller_id = u.id
    WHERE 1=1
  `;
  const params = [];
  if (crop_name) {
    sql += ' AND ml.crop_name LIKE ?';
    params.push('%' + crop_name + '%');
  }
  if (location) {
    sql += ' AND u.location LIKE ?';
    params.push('%' + location + '%');
  }
  sql += ' ORDER BY ml.created_at DESC LIMIT 200;';

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('buyer/marketplaces error', err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json({ listings: results });
  });
});

module.exports = router;