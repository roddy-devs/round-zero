#!/usr/bin/env bash
# One-time (idempotent) setup of the round-zero Postgres container ON the box.
# Run via SSM. Creates the shared network, writes the compose + env to
# /opt/apps/round-zero, and brings the DB up. Safe to re-run.
#
# POSTGRES_PASSWORD is read from SSM (/hiro-apps/round-zero/POSTGRES_PASSWORD);
# it MUST match the password embedded in /hiro-apps/round-zero/DATABASE_URL.
set -euo pipefail

AWS_REGION="${AWS_REGION:-us-east-1}"
APP_DIR="/opt/apps/round-zero"
NET="round-zero-net"

mkdir -p "$APP_DIR"

echo "== network =="
docker network inspect "$NET" >/dev/null 2>&1 || docker network create "$NET"

echo "== password from SSM =="
DB_PASSWORD="$(aws ssm get-parameter --region "$AWS_REGION" --name /hiro-apps/round-zero/POSTGRES_PASSWORD --with-decryption --query Parameter.Value --output text 2>/dev/null || echo 'postgres')"
printf 'POSTGRES_PASSWORD=%s\n' "$DB_PASSWORD" > "$APP_DIR/.db.env"

# The compose file is expected at $APP_DIR/docker-compose.db.yml. The deploy
# workflow / operator copies deploy/docker-compose.db.yml here (or paste it via
# SSM). If missing, fall back to the self-contained docker run in remote.sh.
if [ -f "$APP_DIR/docker-compose.db.yml" ]; then
  echo "== compose up (db) =="
  docker compose --env-file "$APP_DIR/.db.env" -f "$APP_DIR/docker-compose.db.yml" up -d
else
  echo "compose file not found at $APP_DIR/docker-compose.db.yml — remote.sh will create the db container directly."
fi

docker ps --filter name=round-zero-db --format '{{.Names}} {{.Status}}'
echo "db setup ok"
