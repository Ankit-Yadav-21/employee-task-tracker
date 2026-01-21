import { Router } from 'express';
import { AuthController } from '../controllers';
import { registerValidator, loginValidator, validate } from '../validators';
import { authenticate } from '../middlewares';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidator, validate, AuthController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get JWT token
 * @access  Public
 */
router.post('/login', loginValidator, validate, AuthController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get('/me', authenticate, AuthController.getCurrentUser);

export default router;