#!/bin/sh

echo "🚀 Starting frontend service..."

# Install/update dependencies if node_modules doesn't exist or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install --no-frozen-lockfile
fi

echo "✅ Dependencies ready - starting dev server..."

# Start dev server
exec pnpm dev --host 0.0.0.0
