// Input Validation Utilities
import { body, param, query, validationResult } from 'express-validator';

// Custom validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Auth Validation Rules
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain lowercase, uppercase, and numbers'
    ),
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Project Validation Rules
export const validateProjectCreate = [
  body('title')
    .optional({ values: 'null' })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title must not exceed 200 characters'),
];

export const validateProjectUpdate = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Project ID is required'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('code')
    .optional()
    .isString()
    .withMessage('Code must be a string'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
];

// Generation Validation Rules
export const validateGeneration = [
  param('projectId')
    .trim()
    .notEmpty()
    .withMessage('Project ID is required'),
  body('prompt')
    .trim()
    .notEmpty()
    .withMessage('Prompt is required')
    .isLength({ min: 5, max: 5000 })
    .withMessage('Prompt must be between 5 and 5000 characters'),
];

// ID Validation
export const validateProjectId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Project ID is required'),
];

// Query Validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];
