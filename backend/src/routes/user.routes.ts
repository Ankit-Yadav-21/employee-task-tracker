import { Router } from 'express';
import { UserController } from '../controllers';
import { userIdValidator, validate } from '../validators';
import { authenticate, authorize } from '../middlewares';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate, authorize('admin'));

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/', UserController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private/Admin
 */
router.get('/:id', userIdValidator, validate, UserController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private/Admin
 */
router.put('/:id', userIdValidator, validate, UserController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
router.delete('/:id', userIdValidator, validate, UserController.deleteUser);

export default router;