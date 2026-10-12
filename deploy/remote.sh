#!/usr/bin/env bash
# Box-side deploy for round-zero — run ON the hiro-apps EC2 box via SSM.
# Self-contained (SSM sends this script inline): ensures the shared network +
# the Postgres container exist, pulls the latest app image from ECR, and
# (re)starts the app container. Secrets come from SSM Parameter Store.
#
# Topology: app container + db container share the user-defined network
# `round-zero-net`, so the app reaches Postgres at host `round-zero-db:5432`.
# Only the app port is published, bound to 127.0.0.1 (Caddy fronts it).
set -euo pipefail

AWS_REGION="${AWS_REGION:-us-east-1}"
ACCOUNT="080434618477"
REG="$ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com"
APP_DIR="/opt/apps/round-zero"
IMAGE="$REG/round-zero:latest"
NET="round-zero-net"
DB_NAME="round-zero-db"
DB_VOLUME="round_zero_postgres_data"
APP_PORT="3200"

mkdir -p "$APP_DIR"

echo "== ecr login =="
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$REG"

echo "== secrets =="
DATABASE_URL="$(aws ssm get-parameter --region "$AWS_REGION" --name /hiro-apps/round-zero/DATABASE_URL --with-decryption --query Parameter.Value --output text)"
# POSTGRES_PASSWORD for the db container: derive from DATABASE_URL if present,
# else fall back to a dedicated SSM param.
DB_PASSWORD="$(aws ssm get-parameter --region "$AWS_REGION" --name /hiro-apps/round-zero/POSTGRES_PASSWORD --with-decryption --query Parameter.Value --output text 2>/dev/null || echo 'postgres')"

echo "== network =="
docker network inspect "$NET" >/dev/null 2>&1 || docker network create "$NET"

echo "== postgres (create if missing) =="
if ! docker ps --format '{{.Names}}' | grep -qx "$DB_NAME"; then
  # Start (or restart a stopped) db container. Named volume persists data
  # across redeploys. Not published to host — only reachable on $NET.
  docker rm -f "$DB_NAME" 2>/dev/null || true
  docker run -d --name "$DB_NAME" --restart unless-stopped \
    --network "$NET" \
    -e POSTGRES_DB=round_zero \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD="$DB_PASSWORD" \
    -v "$DB_VOLUME:/var/lib/postgresql/data" \
    --health-cmd="pg_isready -U postgres -d round_zero" \
    --health-interval=5s --health-timeout=5s --health-retries=10 \
    --memory=512m --memory-swap=768m \
    postgres:16-alpine
else
  echo "db already running"
fi

echo "== wait for db healthy =="
for i in $(seq 1 20); do
  HS="$(docker inspect -f '{{.State.Health.Status}}' "$DB_NAME" 2>/dev/null || echo starting)"
  echo "db health: $HS"
  [ "$HS" = "healthy" ] && break
  sleep 3
done

echo "== pull app =="
docker pull "$IMAGE"

echo "== run app =="
docker rm -f round-zero 2>/dev/null || true
docker run -d --name round-zero --restart unless-stopped \
  --network "$NET" \
  -p 127.0.0.1:$APP_PORT:$APP_PORT \
  -e NODE_ENV=production \
  -e PORT=$APP_PORT \
  -e DATABASE_URL="$DATABASE_URL" \
  --memory=512m --memory-swap=768m \
  "$IMAGE"

docker image prune -f >/dev/null 2>&1 || true

sleep 4
docker ps --filter name=round-zero --format '{{.Names}} {{.Status}} {{.Ports}}'
echo "deploy ok"
