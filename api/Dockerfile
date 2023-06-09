FROM node:18-alpine AS builder
WORKDIR /api
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/server.js"]