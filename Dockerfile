# File: Dockerfile

# 1. Build stage: install dependencies & compile Next.js
#    Uses an Alpine-based Node image for minimal size :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}
FROM node:22-alpine AS builder
WORKDIR /app

# 1.1 Install only production dependencies to speed up subsequent installs
COPY package.json package-lock.json ./
RUN npm ci --production

# 1.2 Copy source and build
COPY . .
RUN npm run build

# 2. Runtime stage: lean image for serving the app
FROM node:22-alpine AS runtime
WORKDIR /app

# 2.1 Copy built artifacts and node_modules from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 2.2 Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

# 2.3 Healthcheck to verify the app is serving correctly :contentReference[oaicite:2]{index=2}
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# 2.4 Start the Next.js server
CMD ["npm", "start"]