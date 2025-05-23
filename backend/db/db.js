require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gym_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Database connection successful!');
    connection.release(); // Release the connection
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    // In a real application, you might want to implement retry logic
    // or exit the process if the database connection is critical.
    // process.exit(1);
  });

module.exports = pool; 