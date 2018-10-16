#!/bin/bash

# Overview
# In order to get pull requests deployed via CI, we need to ensure that
# the staging 'web' service is aware of the staging 'api' service.
# We can achieve this by deploying the staging api deployment FIRST,
# grabbing the deployment URL from that command and exporting it into
# the CI bash environment as `API_STAGING_URL`.
#
# Next, using the variable from above, and a new script to dynamically create
# a 'now.ui-staging.json' file specifically for this build, containing
# API_STAGING_URL as an 'env' key.
#
# NOTE: currently, this script is only used to generate a
# 'now.ui-staging.json' for deploying PR previews, specifically the 'web'
# service.

# USAGE:
# ./deploy-pr.sh web ${API_STAGING_URL}

set -Eeuo pipefail

SERVICE_NAME=${1?Error: SERVICE_NAME not given}
API_STAGING_URL=${2?Error: API_STAGING_URL not given}
BRANCH_NAME=${CIRCLE_BRANCH}
DEPLOYMENT_ID=$SERVICE_NAME-$BRANCH_NAME-${CIRCLE_SHA1:0:7}-${CIRCLE_BUILD_NUM}

JSON=$(cat <<-EOF
{
  "name": "$DEPLOYMENT_ID",
  "type": "docker",
  "env": {
    "STAGING": "true",
    "API_STAGING_URL": "$API_STAGING_URL",
    "SENTRY_DSN_SERVER": "@sentry-dsn-server",
    "GITHUB_CLIENT_ID_PROD": "@github-client-id-prod",
    "GITHUB_CLIENT_SECRET_PROD": "@github-client-secret-prod",
    "GITHUB_CLIENT_ID_DEV": "@github-client-id-dev",
    "GITHUB_CLIENT_SECRET_DEV": "@github-client-secret-dev",
    "SESSION_SECRET": "@session-secret",
    "APP_SECRET": "@app-secret",
    "SPARKPOST_API_KEY": "@sparkpost-api-key",
    "REDISLABS_PW": "@redislabs-pw",
    "REDISLABS_URI": "@redislabs-uri",
    "ENGINE_API_KEY": "@engine-api-key",
    "PRISMA_ENDPOINT": "@prisma-endpoint",
    "PRISMA_SECRET": "@prisma-secret",
    "PRISMA_MANAGEMENT_API_SECRET": "@prisma-management-api-secret",
    "MAILSLURP_KEY": "@mailslurp-key"
  },
  "features": {
    "cloud": "v2"
  }
}
EOF
)

echo "$JSON" > /home/circleci/gamma/now.ui-staging.json
# echo "$JSON" > ./now.ui-staging.json
exit 0
