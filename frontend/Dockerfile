# Build stage
FROM node:16 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Production stage
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

ENV NODE_ENV=production
EXPOSE 3000

CMD ["yarn", "start"]