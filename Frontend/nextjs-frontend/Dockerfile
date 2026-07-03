# Production stage - use pre-built artifacts
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY .next ./.next
COPY public ./public
COPY next.config.ts ./
COPY next-env.d.ts ./

EXPOSE 3000

CMD ["npx", "next", "start"]
