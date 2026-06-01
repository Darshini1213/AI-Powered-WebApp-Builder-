import { Router } from 'express';
import { registerUser, loginUser, getMe, logout } from '../controllers/auth.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../utils/validation.utils.js';

const router = Router();

router.post('/register', validateRegister, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);

router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;