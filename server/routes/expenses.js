const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get all expenses for a farm
router.get('/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [expenses] = await db.execute(
      'SELECT e.* FROM expenses e JOIN farms f ON e.farm_id = f.id WHERE e.farm_id = ? AND f.user_id = ? ORDER BY e.expense_date DESC',
      [req.params.farmId, req.user.id]
    );
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new expense
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { farm_id, expense_type, amount, description, expense_date } = req.body;

    if (!farm_id || !expense_type || !amount || !expense_date) {
      return res.status(400).json({ error: 'Farm ID, expense type, amount, and date are required' });
    }

    // Verify farm belongs to user
    const [farms] = await db.execute('SELECT * FROM farms WHERE id = ? AND user_id = ?', [farm_id, req.user.id]);
    if (farms.length === 0) {
      return res.status(403).json({ error: 'Farm not found or access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO expenses (farm_id, expense_type, amount, description, expense_date) VALUES (?, ?, ?, ?, ?)',
      [farm_id, expense_type, amount, description || null, expense_date]
    );

    res.status(201).json({ message: 'Expense added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expense summary
router.get('/summary/farm/:farmId', authenticateToken, async (req, res) => {
  try {
    const [summary] = await db.execute(
      `SELECT expense_type, SUM(amount) as total FROM expenses e 
       JOIN farms f ON e.farm_id = f.id 
       WHERE e.farm_id = ? AND f.user_id = ? 
       GROUP BY expense_type`,
      [req.params.farmId, req.user.id]
    );
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

