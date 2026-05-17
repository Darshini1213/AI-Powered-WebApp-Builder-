import express from 'express';
import cors from 'cors';

import "./config/firebase.config.js";

import routes from './routes/index.js';
import {
  errorHandler,
  notFoundHandler
} from './middleware/error.middleware.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Web Builder Backend Running Successfully'
  });
});

// API Routes
app.use('/api', routes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;