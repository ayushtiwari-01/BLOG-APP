// API configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080',
  },
  production: {
    API_BASE_URL: 'https://your-backend-app.onrender.com', // Update after Render deployment
  }
};

const environment = process.env.NODE_ENV || 'development';
const API_BASE_URL = config[environment].API_BASE_URL;

export default API_BASE_URL;
