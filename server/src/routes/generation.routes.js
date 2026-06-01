import { Router } from 'express';
import { generateCode } from '../controllers/generation.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import {
  validateGeneration,
  handleValidationErrors,
} from '../utils/validation.utils.js';

const router = Router();

router.use(authenticate);

router.post('/:projectId', validateGeneration, handleValidationErrors, generateCode);

export default router;