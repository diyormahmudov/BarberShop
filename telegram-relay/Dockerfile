FROM node:20-alpine

WORKDIR /app

COPY telegram-relay.js package*.json ./

RUN npm install axios

CMD ["node", "telegram-relay.js"]
