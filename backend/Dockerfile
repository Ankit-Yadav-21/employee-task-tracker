FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY drizzle.config.ts tsconfig.json ./

RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 5000

CMD ["docker-entrypoint.sh"]
