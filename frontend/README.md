# Employee Task Tracker - Frontend

A modern, production-ready React frontend built with TypeScript, Vite, Tailwind CSS, Zustand, and Axios.

## Features

- ✅ Role-based authentication (Admin & Employee)
- ✅ Admin Dashboard: Manage tasks and view employees
- ✅ Employee Dashboard: View and update assigned tasks
- ✅ Real-time task status updates
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ Centralized state management with Zustand
- ✅ Clean component architecture (DRY, SOLID principles)
- ✅ Comprehensive error handling
- ✅ Form validation
- ✅ Protected routes

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **Axios** - HTTP Client
- **React Router** - Routing
- **React Hook Form** - Form Handling
- **Zod** - Schema Validation
- **date-fns** - Date Formatting

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5000`

## Installation

1. Clone the repository and navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure
