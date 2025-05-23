const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Get all members
router.get('/', async (req, res, next) => {
  try {
    // Placeholder query: SELECT * FROM members
    const [rows] = await pool.query('SELECT * FROM members');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching members:', error);
    next(error); // Pass error to the error handling middleware
  }
});

// Get a single member by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // Placeholder query: SELECT * FROM members WHERE id = ?
    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Member not found');
      error.statusCode = 404;
      next(error);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching member:', error);
    next(error); // Pass error to the error handling middleware
  }
});

// Create a new member
router.post('/', async (req, res, next) => {
  const { name, email, phone, address, join_date, membership_type, membership_status } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO members (name, email, phone, address, join_date, membership_type, membership_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, join_date, membership_type, membership_status]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Member created successfully'
    });
  } catch (error) {
    console.error('Error creating member:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      const err = new Error('Email already exists');
      err.statusCode = 400;
      next(err);
    } else {
      next(error);
    }
  }
});

module.exports = router; 