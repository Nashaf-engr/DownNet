FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

ENV NODE_ENV=production
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-http://localhost:5000/api}

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
