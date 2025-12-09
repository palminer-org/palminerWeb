# Multi-stage build Dockerfile
# Stage 1: Build application
FROM node:18-alpine AS builder

# Install build tools (for compiling native modules)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies (node:18-alpine already includes yarn)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments: environment variables
ARG VITE_ENV=test
ARG VITE_API_BASE_URL=https://palminer-api.example.app
ARG VITE_BSC_RPC_URL
ARG VITE_BSC_TESTNET_RPC_URL

# Set environment variables (Vite requires VITE_ prefix)
ENV VITE_ENV=${VITE_ENV}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_BSC_RPC_URL=${VITE_BSC_RPC_URL}
ENV VITE_BSC_TESTNET_RPC_URL=${VITE_BSC_TESTNET_RPC_URL}

# Build application
RUN yarn build

# Stage 2: Serve static files with nginx
FROM nginx:alpine

# Build argument: API base URL (for replacing in nginx config)
# Note: ARG cannot be passed across stages in multi-stage builds, so it needs to be redeclared
ARG VITE_API_BASE_URL=https://palminer-api.example.app

# Copy nginx configuration file
COPY nginx.conf /tmp/nginx.conf

# Use sed to replace API address in nginx config
RUN sed -i "s|https://palminer-api.example.app|${VITE_API_BASE_URL}|g" /tmp/nginx.conf && \
    cp /tmp/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

