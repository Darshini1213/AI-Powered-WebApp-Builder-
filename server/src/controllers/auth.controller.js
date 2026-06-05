 import * as authService from '../services/auth.service.js';
import { sanitizeInput, sanitizeEmail } from '../utils/sanitization.utils.js';

export const registerUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Sanitize inputs (password is hashed — do not run through XSS sanitizer)
    name = sanitizeInput(name);
    email = sanitizeEmail(email);

    // Validation errors already handled by express-validator
    const result = await authService.register(name, email, password);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = sanitizeEmail(email);

    const result = await authService.emailLogin(email, password);
    return res.json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  return res.json({ success: true, data: { message: 'Logged out successfully' } });
};