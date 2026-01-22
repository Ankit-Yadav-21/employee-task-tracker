FROM node:20-alpine

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy config files needed for postinstall script
COPY drizzle.config.ts tsconfig.json ./

# Install dependencies (skip postinstall during Docker build)
# Use --no-frozen-lockfile in case lockfile needs updates during build
RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Copy source code (will be overridden by volume mount in development)
COPY . .

# Expose port
EXPOSE 5000

# Use entrypoint script with explicit shell
ENTRYPOINT ["pnpm", "dev"]
