# round-zero — production image.
# Vite SPA + a small Express API (server/index.ts) talking to Postgres via Prisma.
# Build happens in CI; the box only pulls + runs this image (3.7 GB box, no on-box builds).

# ---- deps: install all deps (incl. dev) for the build ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- build: generate client, build SPA + bundle the server ----
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# `npm run build` = prisma generate && tsc -b && vite build && build:server
RUN npm run build

# ---- run: lean runtime ----
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3200

# Non-root user.
RUN addgroup -S app && adduser -S app -G app

# Production deps only (prunes dev deps like vite/esbuild/typescript).
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Prisma: schema + migrations (for `migrate deploy`) and the generated client.
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Built artifacts: SPA static files + bundled server.
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server

# Entrypoint: apply migrations, then start the server.
COPY deploy/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh && chown -R app:app /app

USER app
EXPOSE 3200
CMD ["./entrypoint.sh"]
