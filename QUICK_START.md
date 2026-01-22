# Quick Start Guide

## One-Command Setup

Run everything with Docker:

```bash
docker-compose up --build
```

That's it! 🎉

## What Happens

1. **MySQL Database** starts and initializes
2. **Backend** builds, runs migrations, and starts
3. **Frontend** builds and starts
4. All services are connected and ready

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **MySQL**: localhost:3306

## First Steps

1. Open http://localhost:5173 in your browser
2. Register a new user
3. Make yourself admin (see below)

## Making a User Admin

Connect to MySQL and update the role:

```bash
docker exec -it employee-task-mysql mysql -u root -proot employee_task_db
```

Then run:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Useful Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# Restart a specific service
docker-compose restart backend
```

## Troubleshooting

**Services won't start?**
- Check if ports 3306, 5000, or 5173 are already in use
- View logs: `docker-compose logs -f`

**Database connection issues?**
- Wait a bit longer - MySQL takes time to initialize
- Check backend logs: `docker-compose logs backend`

**Frontend can't connect to backend?**
- Ensure backend is running: `docker-compose ps`
- Check backend logs for errors

## Development Mode

The current setup uses volume mounts, so code changes are reflected automatically:
- Backend: Hot reload enabled
- Frontend: Vite dev server with hot reload

## Production Build

To build for production, modify `docker-compose.yml`:
- Set `NODE_ENV=production` in backend
- Build frontend: `pnpm build` in frontend Dockerfile
- Use a production server like nginx for frontend
