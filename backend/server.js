const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables first
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// CORS configuration for production - DEFINE THIS FIRST
const corsOptions = {
  origin: [
    'http://localhost:3000', // Development
    'https://ayush-blogapp.vercel.app', // Production frontend
    'https://blog-app-wwf4.onrender.com' // Backend (for testing)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware - USE corsOptions AFTER it's defined
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Now this will work
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Custom request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`📨 ${req.method} ${req.originalUrl} - ${timestamp}`.cyan);
  
  // Log response when request finishes
  res.on('finish', () => {
    const statusEmoji = res.statusCode >= 400 ? '❌' : '✅';
    console.log(`${statusEmoji} ${req.method} ${req.originalUrl} - ${res.statusCode} ${res.statusMessage}`.cyan);
  });
  
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog App API Server', 
    version: '1.0.0',
    status: 'Running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      users: '/api/v1/user',
      blogs: '/api/v1/blog',
      test: '/api/test'
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080
  });
});

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// API 404 handler - must come after all API routes
app.use('/api/*', (req, res) => {
  console.log('❌ API route not found:', req.originalUrl);
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requestedPath: req.originalUrl,
    availableEndpoints: {
      users: '/api/v1/user',
      blogs: '/api/v1/blog',
      test: '/api/test'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:'.red, err.message);
  console.error('Stack trace:'.red, err.stack);
  
  // Don't expose error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(isDevelopment && { 
      error: err.message,
      stack: err.stack 
    })
  });
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...'.yellow);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...'.yellow);
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Promise Rejection:'.red, reason);
  console.log('Shutting down server due to unhandled promise rejection'.red);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:'.red, error.message);
  console.error('Stack trace:'.red, error.stack);
  console.log('Shutting down server due to uncaught exception'.red);
  process.exit(1);
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Start server
const server = app.listen(PORT, () => {
  const mode = process.env.NODE_ENV || 'development';
  console.log(`🚀 Server running in ${mode} mode on port ${PORT}`.bgGreen.white);
  console.log(`🌐 API Base URL: ${mode === 'production' ? 'https://blog-app-wwf4.onrender.com' : `http://localhost:${PORT}`}`.bgBlue.white);
  console.log(`🔗 Frontend URL: https://ayush-blogapp.vercel.app`.bgMagenta.white);
  console.log(`🧪 Test endpoint: ${mode === 'production' ? 'https://blog-app-wwf4.onrender.com' : `http://localhost:${PORT}`}/api/test`.bgCyan.white);
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`.red);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`.red);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

module.exports = app;
