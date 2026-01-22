# Employee Task Tracker

A full-stack application for managing employees and tasks. Admins can create tasks and assign them to employees, while employees can view and update their task status.

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **MySQL** database
- **Drizzle ORM** for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for validation

### Frontend
- **React** with **TypeScript**
- **Vite** as build tool
- **React Router** for routing
- **Axios** for API calls
- **Tailwind CSS** for styling

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/Employee)

### Admin Features
- View all employees
- Create and assign tasks to employees
- View all tasks in a table
- Edit tasks (title, description, status, due date, assigned employee)
- Delete tasks

### Employee Features
- View only assigned tasks
- Update task status (Pending → In Progress → Completed)
- Tasks organized by status columns

## Project Structure

```
employee-task-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── db/             # Database configuration and schema
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── validators/     # Request validation
│   │   └── server.ts       # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main app component
│   └── package.json
└── docker-compose.yml      # Docker setup for MySQL
```

## Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (or npm/yarn)
- **MySQL** (v8.0 or higher) or use Docker Compose

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-task-tracker
```

### 2. Database Setup

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start a MySQL container with:
- Database: `employee_task_db`
- Root Password: `root`
- User: `app_user`
- Password: `app_password`
- Port: `3306`

**Note:** Update your `.env` file to match these credentials or modify `docker-compose.yml` to match your preferred settings.

#### Option B: Using Local MySQL

Create a MySQL database named `task_tracker` and update the `.env` file accordingly.

### 3. Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost (or mysql if using Docker)
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=rootpassword
# DB_NAME=task_tracker
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRES_IN=7d
# PORT=5000
# NODE_ENV=development

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Create .env file (optional)
# VITE_API_BASE_URL=http://localhost:5000/api

# Start development server
pnpm dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires auth)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/employees` - Get all employees
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/tasks` - Get tasks for a specific user

### Tasks
- `POST /api/tasks` - Create a new task (Admin only)
- `GET /api/tasks` - Get all tasks (Admin sees all, Employee sees only their tasks)
- `GET /api/tasks?status=pending` - Filter tasks by status
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task (Admin: all fields, Employee: status only for own tasks)
- `DELETE /api/tasks/:id` - Delete task (Admin only)

## Database Schema

### Users Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR(100))
- `email` (VARCHAR(255), UNIQUE)
- `password` (VARCHAR(255), hashed)
- `role` (ENUM: 'admin', 'employee')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tasks Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (VARCHAR(200))
- `description` (TEXT)
- `assigned_to` (INT, FOREIGN KEY → users.id)
- `status` (ENUM: 'pending', 'in_progress', 'completed')
- `due_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Usage

### Creating an Admin User

1. Register a new user through the frontend or API
2. Update the user's role to 'admin' in the database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

### Testing the Application

1. **As Admin:**
   - Login with admin credentials
   - View all employees
   - Create tasks and assign them to employees
   - View and edit all tasks

2. **As Employee:**
   - Login with employee credentials
   - View only your assigned tasks
   - Update task status (Pending → In Progress → Completed)

## Development Scripts

### Backend
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio (database GUI)

### Frontend
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control middleware
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- CORS configuration

## Bonus Features Implemented

- ✅ Role-based route protection in React
- ✅ Filters by status (query parameter)
- ✅ Clean folder structure
- ✅ Proper error handling
- ✅ SQL JOIN usage (tasks with user information)

## API Documentation

See `postman_collection.json` for a complete Postman collection with all API endpoints and example requests.

## License

ISC
