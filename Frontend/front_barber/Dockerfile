# frontend/Dockerfile
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Muhim: package.json va lock fayllarni nusxalash
COPY package*.json ./
COPY yarn.lock* ./

# npm o'rniga yarn o'rnatish
RUN npm install -g yarn --force

# Bog'liqliklarni o'rnatish (yarn ishlatish)
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else yarn install; fi

# Barcha fayllarni nusxalash
COPY . .

# Build qilish
RUN yarn build

# Production bosqichi
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx konfiguratsiyasi
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://backend:3000; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]