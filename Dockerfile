FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY server/package.json ./server/package.json
RUN npm install && npm --prefix server install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000 4000
CMD ["npm", "run", "start"]
