# --- ESTÁGIO 1: Build da Aplicação Angular ---
FROM node:20-alpine AS builder

WORKDIR /app

# Mude esta linha para copiar apenas package.json
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Resto continua igual
COPY . .
RUN npx ng build --configuration production
