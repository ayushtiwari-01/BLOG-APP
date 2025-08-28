const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080',
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://blog-app-wwf4.onrender.com',
  }
};

const environment = process.env.NODE_ENV || 'development';
const API_BASE_URL = config[environment].API_BASE_URL;

// Debug logs to help troubleshoot
console.log('🌍 Environment:', environment);
console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🎯 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

export default API_BASE_URL;
