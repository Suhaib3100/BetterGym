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

// Create a new trainer
router.post('/', async (req, res, next) => {
  const { name, email, phone, specialization, experience_years, status } = req.body;

  try {
    // Check if email already exists
    const [existingTrainers] = await pool.query(
      'SELECT id FROM trainers WHERE email = ?',
      [email]
    );

    if (existingTrainers.length > 0) {
      const error = new Error('Email already exists');
      error.statusCode = 400;
      throw error;
    }

    // Insert new trainer
    const [result] = await pool.query(
      'INSERT INTO trainers (name, email, phone, specialization, experience_years, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, specialization, experience_years, status]
    );

    // Get the created trainer
    const [newTrainer] = await pool.query(
      'SELECT * FROM trainers WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newTrainer[0]);
  } catch (error) {
    console.error('Error creating trainer:', error);
    next(error);
  }
});

module.exports = router; 