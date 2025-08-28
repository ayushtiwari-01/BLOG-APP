# Blog App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with user authentication and CRUD operations.

## Project Structure

```
BLOG-APP/
├── backend/          # Backend server files
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── client/           # Frontend React application
│   ├── src/          # React source code
│   ├── public/       # Public assets
│   └── build/        # Production build
├── package.json      # Root package.json for managing both apps
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=8080
   NODE_ENV=development
   ```

## Running the Application

### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```
This will start both the backend server and frontend development server concurrently.

### Backend Only
```bash
npm run server
```
Starts the backend server with nodemon for development.

### Frontend Only
```bash
npm run client
```
Starts the React development server.

### Production
```bash
npm run build
npm start
```
Builds the frontend and starts the production server.

## API Endpoints

- **User Routes:** `/api/v1/user/*`
  - `POST /register` - User registration
  - `POST /login` - User login
  - `GET /all-users` - Get all users

- **Blog Routes:** `/api/v1/blog/*`
  - `GET /all-blog` - Get all blogs
  - `POST /create-blog` - Create new blog
  - `PUT /update-blog/:id` - Update blog
  - `GET /get-blog/:id` - Get blog by ID
  - `DELETE /delete-blog/:id` - Delete blog
  - `GET /user-blog/:id` - Get user's blogs
  - `GET /search` - Search blogs

## Features

- User authentication (register/login)
- Create, read, update, and delete blogs
- Search functionality
- Responsive design with Material-UI
- Redux state management
- MongoDB database with Mongoose ODM

## Ports

- **Backend:** 8080
- **Frontend:** 3000 (development)
- **Frontend:** Served by backend in production

## Notes

- The frontend proxy is configured to forward API requests to `http://localhost:8080`
- In production, the React app is served as static files by the Express server
- All relative imports in the backend have been updated to work with the new folder structure
