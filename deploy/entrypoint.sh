#!/bin/sh
# Container entrypoint: apply pending Prisma migrations, then start the server.
# Runs on every container start — `migrate deploy` is idempotent (no-op if the
# DB is already up to date).
set -e

echo "== prisma migrate deploy =="
npx prisma migrate deploy

echo "== starting round-zero on :${PORT:-3200} =="
exec node dist-server/index.js
