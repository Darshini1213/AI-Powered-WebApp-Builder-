import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import "./config/firebase.config.js";
import config from './config/config.js';

import routes from './routes/index.js';
import {
  errorHandler,
  notFoundHandler
} from './middleware/error.middleware.js';
import { requestLogger } from './middleware/logging.middleware.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('APP');
const app = express();

// CORS Configuration (must be before helmet and security middleware)
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigin = config.cors.origin;
    // Allow localhost with any port, or the configured origin
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || (allowedOrigin && origin === allowedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

// Security Middleware (after CORS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body Parser Middleware
app.use(express.json({ limit: config.api.maxRequestSize }));
app.use(express.urlencoded({ limit: config.api.maxRequestSize, extended: true }));

// Request Logging Middleware
app.use(requestLogger);

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Web Builder Backend Running Successfully'
  });
});

// Ignore favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// API Routes
app.use('/api', routes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;