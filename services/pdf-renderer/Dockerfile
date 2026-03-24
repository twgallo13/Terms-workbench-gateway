FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY dist/ ./dist/

ENV PORT=8081
EXPOSE 8081

CMD ["node", "dist/index.js"]
