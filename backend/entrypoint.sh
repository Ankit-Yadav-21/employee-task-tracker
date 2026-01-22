#!/bin/sh

echo "🚀 Starting backend service..."

# Install/update dependencies if node_modules doesn't exist or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install --no-frozen-lockfile
fi

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
until nc -z mysql 3306; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "✅ MySQL is up - executing migrations..."

# Generate migrations if needed (in case schema changed)
echo "📦 Generating migrations..."
pnpm db:generate || echo "⚠️  No schema changes or migrations already exist"

# Run database migrations
echo "🔄 Pushing schema to database..."
pnpm db:push

echo "✅ Migrations completed!"

# Build TypeScript if dist doesn't exist or in production
if [ "$NODE_ENV" = "production" ] || [ ! -d "dist" ]; then
  echo "📦 Building TypeScript..."
  pnpm build
fi

# Start the server
echo "🚀 Starting Node.js server..."
if [ "$NODE_ENV" = "production" ]; then
  exec pnpm start
else
  exec pnpm dev
fi
