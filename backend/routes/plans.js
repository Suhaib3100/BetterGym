const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Get all workout plans
router.get('/workout', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM workout_plans');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    next(error);
  }
});

// Get a single workout plan
router.get('/workout/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM workout_plans WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Workout plan not found');
      error.statusCode = 404;
      next(error);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    next(error);
  }
});

// Get all diet plans
router.get('/diet', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM diet_plans');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching diet plans:', error);
    next(error);
  }
});

// Get a single diet plan
router.get('/diet/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM diet_plans WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Diet plan not found');
      error.statusCode = 404;
      next(error);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    next(error);
  }
});

module.exports = router; 