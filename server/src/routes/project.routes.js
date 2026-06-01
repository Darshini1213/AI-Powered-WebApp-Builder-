import { Router } from 'express';
import { getProjects, createProject, getProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import {
  validateProjectCreate,
  validateProjectUpdate,
  validateProjectId,
  validatePagination,
  handleValidationErrors,
} from '../utils/validation.utils.js';

const router = Router();

router.use(authenticate);

router.get('/', validatePagination, handleValidationErrors, getProjects);
router.post('/', validateProjectCreate, handleValidationErrors, createProject);
router.get('/:id', validateProjectId, handleValidationErrors, getProject);
router.put('/:id', validateProjectUpdate, handleValidationErrors, updateProject);
router.delete('/:id', validateProjectId, handleValidationErrors, deleteProject);

export default router;