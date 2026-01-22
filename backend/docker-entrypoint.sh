#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "✅ MySQL is up"

echo "📦 Running database migrations..."
pnpm db:migrate

echo "🚀 Starting server..."
exec pnpm dev
