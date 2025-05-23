require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const membersRouter = require('./routes/members');
const trainersRouter = require('./routes/trainers');
const plansRouter = require('./routes/plans');
const paymentsRouter = require('./routes/payments');

const app = express();
const port = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/manager/members', membersRouter);
app.use('/api/manager/trainers', trainersRouter);
app.use('/api/manager/plans', plansRouter);
app.use('/api/manager/payments', paymentsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
}); 