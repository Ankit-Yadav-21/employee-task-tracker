import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger middleware (morgan)
const morganFormat = process.env.NODE_ENV === 'production' 
    ? 'combined' 
    : 'dev';

app.use(morgan(morganFormat, {
    stream: {
        write: (message: string) => {
            logger.http(message.trim());
        }
    }
}));

// Health routes
app.use('/health', (_, res) => {
    res.status(200).json({ status: 'OK' });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`🚀 Server is running on: http://localhost:${PORT}`);
    logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    logger.error('❌ UNHANDLED REJECTION! Shutting down...', { error: err });
    logger.error(`Error: ${err.name} - ${err.message}`);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    logger.error('❌ UNCAUGHT EXCEPTION! Shutting down...', { error: err });
    logger.error(`Error: ${err.name} - ${err.message}`);
    process.exit(1);
});

export default app;