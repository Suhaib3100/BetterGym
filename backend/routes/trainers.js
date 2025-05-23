const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Get all trainers
router.get('/', async (req, res, next) => {
  try {
    // Placeholder query: SELECT * FROM trainers
    const [rows] = await pool.query('SELECT * FROM trainers');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    next(error); // Pass error to the error handling middleware
  }
});

// Get a single trainer by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // Placeholder query: SELECT * FROM trainers WHERE id = ?
    const [rows] = await pool.query('SELECT * FROM trainers WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Trainer not found');
      error.statusCode = 404;
      next(error);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching trainer:', error);
    next(error); // Pass error to the error handling middleware
  }
});

module.exports = router; 