const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/db');

// Get all learning resources
router.get('/', async (req, res) => {
  try {
    const { category, content_type, language } = req.query;
    let query = 'SELECT * FROM learning_resources WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (content_type) {
      query += ' AND content_type = ?';
      params.push(content_type);
    }
    if (language) {
      query += ' AND language = ?';
      params.push(language);
    }

    query += ' ORDER BY created_at DESC';

    const [resources] = await db.execute(query, params);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific learning resource
router.get('/:id', async (req, res) => {
  try {
    const [resources] = await db.execute('SELECT * FROM learning_resources WHERE id = ?', [req.params.id]);
    if (resources.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resources[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's learning progress
router.get('/progress/my-progress', authenticateToken, async (req, res) => {
  try {
    const [progress] = await db.execute(
      `SELECT ulp.*, lr.title, lr.category FROM user_learning_progress ulp 
       JOIN learning_resources lr ON ulp.resource_id = lr.id 
       WHERE ulp.user_id = ? 
       ORDER BY ulp.created_at DESC`,
      [req.user.id]
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update learning progress
router.post('/progress', authenticateToken, async (req, res) => {
  try {
    const { resource_id, status, progress_percentage } = req.body;

    if (!resource_id) {
      return res.status(400).json({ error: 'Resource ID is required' });
    }

    const [existing] = await db.execute(
      'SELECT * FROM user_learning_progress WHERE user_id = ? AND resource_id = ?',
      [req.user.id, resource_id]
    );

    if (existing.length > 0) {
      await db.execute(
        'UPDATE user_learning_progress SET status = ?, progress_percentage = ?, completed_at = ? WHERE user_id = ? AND resource_id = ?',
        [
          status || existing[0].status,
          progress_percentage !== undefined ? progress_percentage : existing[0].progress_percentage,
          status === 'completed' ? new Date() : existing[0].completed_at,
          req.user.id,
          resource_id
        ]
      );
      res.json({ message: 'Progress updated successfully' });
    } else {
      const [result] = await db.execute(
        'INSERT INTO user_learning_progress (user_id, resource_id, status, progress_percentage, completed_at) VALUES (?, ?, ?, ?, ?)',
        [
          req.user.id,
          resource_id,
          status || 'not_started',
          progress_percentage || 0,
          status === 'completed' ? new Date() : null
        ]
      );
      res.status(201).json({ message: 'Progress recorded successfully', id: result.insertId });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

