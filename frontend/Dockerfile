FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# Use --no-frozen-lockfile in case lockfile needs updates during build
RUN pnpm install --no-frozen-lockfile

# Copy source code (will be overridden by volume mount in development)
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
