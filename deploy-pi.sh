#!/usr/bin/env bash

set -euo pipefail

APP_NAME="${APP_NAME:-akhilesh-portfolio}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/akhilesh-portfolio}"
PORT="${PORT:-3000}"
EXAMPLE_COMMAND="DEPLOY_USER=<ssh-user> DEPLOY_HOST=<pi-host-or-ip> npm run deploy:pi"

if [[ -z "${DEPLOY_USER:-}" ]]; then
  echo "Error: DEPLOY_USER is required." >&2
  echo "Example: ${EXAMPLE_COMMAND}" >&2
  exit 1
fi

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  echo "Error: DEPLOY_HOST is required." >&2
  echo "Example: ${EXAMPLE_COMMAND}" >&2
  exit 1
fi

REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"

echo "Building ${APP_NAME}..."
npm run build

echo "Preparing ${REMOTE}:${DEPLOY_PATH}/dist..."
ssh "${REMOTE}" "mkdir -p '${DEPLOY_PATH}/dist'"

echo "Syncing dist/ to ${REMOTE}:${DEPLOY_PATH}/dist..."
rsync -az --delete dist/ "${REMOTE}:${DEPLOY_PATH}/dist/"

echo "Restarting PM2 process ${APP_NAME} from first available port at or above ${PORT}..."
SELECTED_PORT="$(
  ssh "${REMOTE}" "APP_NAME='${APP_NAME}' DEPLOY_DIR='${DEPLOY_PATH}/dist' START_PORT='${PORT}' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

pm2 delete "${APP_NAME}" >/dev/null 2>&1 || true

port="${START_PORT}"

is_port_busy() {
  local candidate="$1"

  if command -v ss >/dev/null 2>&1; then
    ss -ltn "sport = :${candidate}" | grep -q ":${candidate}"
    return
  fi

  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"${candidate}" -sTCP:LISTEN -Pn >/dev/null 2>&1
    return
  fi

  if command -v netstat >/dev/null 2>&1; then
    netstat -ltn | awk '{print $4}' | grep -Eq "[:.]${candidate}$"
    return
  fi

  return 1
}

while is_port_busy "${port}"; do
  port=$((port + 1))
done

pm2 serve "${DEPLOY_DIR}" "${port}" --spa --name "${APP_NAME}" >/dev/null
pm2 save >/dev/null

echo "${port}"
REMOTE_SCRIPT
)"

echo "Deployment complete: ${APP_NAME} is serving ${DEPLOY_PATH}/dist on port ${SELECTED_PORT}."
