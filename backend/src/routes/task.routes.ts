import { Router } from 'express';
import { TaskController } from '../controllers';
import {
    createTaskValidator,
    updateTaskValidator,
    taskIdValidator,
    userIdValidator,
    validate,
} from '../validators';
import { authenticate, authorize } from '../middlewares';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private/Admin
 */
router.post(
    '/',
    authorize('admin'),
    createTaskValidator,
    validate,
    TaskController.createTask
);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks (with optional status filter)
 * @access  Private
 * @query   status: pending | in_progress | completed
 */
router.get('/', TaskController.getAllTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get task by ID
 * @access  Private
 */
router.get('/:id', taskIdValidator, validate, TaskController.getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task (Admin: all fields, Employee: status only for own tasks)
 * @access  Private
 */
router.put('/:id', updateTaskValidator, validate, TaskController.updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private/Admin
 */
router.delete(
    '/:id',
    authorize('admin'),
    taskIdValidator,
    validate,
    TaskController.deleteTask
);

/**
 * @route   GET /api/users/:id/tasks
 * @desc    Get all tasks for a specific user
 * @access  Private
 */
router.get(
    '/users/:id/tasks',
    userIdValidator,
    validate,
    TaskController.getUserTasks
);

export default router;