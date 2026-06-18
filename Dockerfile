# syntax=docker/dockerfile:1

# One image that builds the React frontend and serves it together with the API.

# --- Stage 1: build the Vite/React frontend -> static files ---
FROM node:22-alpine AS web
WORKDIR /web
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: install backend dependencies (includes the tsx runtime) ---
FROM node:22-alpine AS server-deps
WORKDIR /server
COPY server/package.json server/package-lock.json ./
RUN npm ci

# --- Stage 3: runtime ---
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=4000 \
    WEB_DIR=./public-web \
    RESUME_PATH=./public-web/Jeet_Sharma_Resume.pdf

# Backend deps + source
COPY --from=server-deps /server/node_modules ./node_modules
COPY server/package.json server/package-lock.json server/tsconfig.json ./
COPY server/src ./src

# Built frontend, served by the same Express app via WEB_DIR
COPY --from=web /web/dist ./public-web

EXPOSE 4000
CMD ["node_modules/.bin/tsx", "src/server.ts"]
