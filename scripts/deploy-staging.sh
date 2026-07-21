#!/bin/bash

set -euo pipefail

echo "Starting staging deployment..."

if [ ! -d "dist" ]; then
  echo "Error: dist directory does not exist."
  exit 1
fi

rm -rf staging-deployment
mkdir -p staging-deployment

cp -r dist/* staging-deployment/

cat > staging-deployment/deployment-info.txt <<EOF
Application: GitHub Actions CI/CD Pipeline
Environment: staging
Commit: ${GITHUB_SHA:-unknown}
Branch: ${GITHUB_REF_NAME:-unknown}
Run Number: ${GITHUB_RUN_NUMBER:-unknown}
Deployed At: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
Deployed By: GitHub Actions
EOF

test -f staging-deployment/src/server.js
test -f staging-deployment/package.json
test -f staging-deployment/build-info.json
test -f staging-deployment/deployment-info.txt

echo "Staging deployment completed successfully."