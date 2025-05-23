const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Get all payments
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, m.name as member_name 
      FROM payments p 
      JOIN members m ON p.member_id = m.id 
      ORDER BY p.payment_date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching payments:', error);
    next(error);
  }
});

// Get payments for a specific member
router.get('/member/:memberId', async (req, res, next) => {
  const { memberId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM payments WHERE member_id = ? ORDER BY payment_date DESC',
      [memberId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching member payments:', error);
    next(error);
  }
});

// Create a new payment
router.post('/', async (req, res, next) => {
  const { member_id, amount, payment_type, payment_date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO payments (member_id, amount, payment_type, payment_date) VALUES (?, ?, ?, ?)',
      [member_id, amount, payment_type, payment_date]
    );
    res.status(201).json({ id: result.insertId, message: 'Payment created successfully' });
  } catch (error) {
    console.error('Error creating payment:', error);
    next(error);
  }
});

module.exports = router; 