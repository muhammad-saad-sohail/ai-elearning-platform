/**
 * AI E-Learning Platform - Server Entry Point
 * Express.js server with MongoDB, JWT authentication, and Socket.io
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes (to be created)
// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/courses');
// const userRoutes = require('./routes/users');

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'AI E-Learning Platform API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      courses: {
        getAll: 'GET /api/courses',
        getById: 'GET /api/courses/:id',
        enroll: 'POST /api/courses/:id/enroll',
        recommendations: 'GET /api/courses/recommendations'
      },
      users: {
        profile: 'GET /api/users/profile',
        progress: 'GET /api/users/progress',
        update: 'PUT /api/users/profile'
      }
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes (demo endpoints)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  // TODO: Implement actual registration logic
  res.status(201).json({
    success: true,
    message: 'User registration - coming soon',
    user: {
      name,
      email,
      role: role || 'student'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // TODO: Implement actual login logic
  res.json({
    success: true,
    message: 'Login endpoint - demo mode',
    token: 'demo_jwt_token_123',
    user: {
      id: 'user_123',
      email,
      role: 'student'
    }
  });
});

app.get('/api/courses', (req, res) => {
  // Demo courses
  const courses = [
    {
      id: 'course_1',
      title: 'Introduction to Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 1250,
      duration: '8 weeks',
      level: 'Beginner',
      price: 49.99
    },
    {
      id: 'course_2',
      title: 'Advanced Web Development',
      instructor: 'Prof. Michael Chen',
      rating: 4.9,
      students: 890,
      duration: '10 weeks',
      level: 'Advanced',
      price: 79.99
    },
    {
      id: 'course_3',
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.7,
      students: 2100,
      duration: '12 weeks',
      level: 'Intermediate',
      price: 59.99
    }
  ];
  
  res.json({
    success: true,
    count: courses.length,
    courses
  });
});

app.get('/api/courses/recommendations', (req, res) => {
  // Demo recommendations
  const recommendations = [
    {
      id: 'course_1',
      title: 'Introduction to Machine Learning',
      matchScore: 0.95,
      reason: 'Based on your interest in AI and programming'
    },
    {
      id: 'course_3',
      title: 'Data Science with Python',
      matchScore: 0.87,
      reason: 'Matches your skill level and learning goals'
    }
  ];
  
  res.json({
    success: true,
    recommendations,
    message: 'AI-powered recommendations - demo mode'
  });
});

app.post('/api/courses/:id/enroll', (req, res) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    message: `Enrolled in course ${id}`,
    enrollment: {
      courseId: id,
      userId: 'user_123',
      enrolledAt: new Date().toISOString(),
      progress: 0
    }
  });
});

app.get('/api/users/progress', (req, res) => {
  const progress = {
    totalCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    totalHours: 45,
    achievements: ['First Course Complete', 'Week Streak: 7 days'],
    recentActivity: [
      {
        courseId: 'course_1',
        title: 'Introduction to Machine Learning',
        progress: 65,
        lastAccessed: new Date().toISOString()
      }
    ]
  };
  
  res.json({
    success: true,
    progress
  });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║   AI E-Learning Platform API Server          ║
  ║   Version: 1.0.0                             ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                        ║
  ║   Running on: http://${HOST}:${PORT}           ║
  ╚══════════════════════════════════════════════╝
  
  📚 API Endpoints:
     - Health Check: http://localhost:${PORT}/health
     - Courses: http://localhost:${PORT}/api/courses
     - Recommendations: http://localhost:${PORT}/api/courses/recommendations
  
  🔧 Status: Development Mode
  📝 Full features coming soon!
  `);
});

module.exports = app;
