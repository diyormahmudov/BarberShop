FROM node:20-bullseye-slim AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock* ./
RUN npm install -g yarn --force
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else yarn install; fi
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
