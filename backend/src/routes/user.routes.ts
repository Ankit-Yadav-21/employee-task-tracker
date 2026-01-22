import { Router } from 'express';
import { UserController, TaskController } from '../controllers';
import { userIdSchema, validate } from '../validators';
import { authenticate, authorize } from '../middlewares';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/users/:id/tasks
 * @desc    Get all tasks for a specific user
 * @access  Private (Admin can access any user, Employee can only access their own)
 * @note    This route must come before admin-only routes to allow employees to access their own tasks
 */
router.get('/:id/tasks', validate(userIdSchema, "params"), TaskController.getUserTasks);

// All routes below require admin role
router.use(authorize('admin'));

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/', UserController.getAllUsers);

/**
 * @route   GET /api/users/employees
 * @desc    Get all employees
 * @access  Private/Admin
 */
router.get('/employees', UserController.getAllEmployees);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private/Admin
 */
router.get('/:id', validate(userIdSchema, "params"), UserController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private/Admin
 */
router.put('/:id', validate(userIdSchema, "params"), UserController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
router.delete('/:id', validate(userIdSchema, "params"), UserController.deleteUser);

export default router;