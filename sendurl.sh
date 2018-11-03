#!/bin/bash

# USAGE:
# ./sendurl ${DEPLOY_PREVIEW_URL}

set -Eeuo pipefail

DEPLOY_PREVIEW_URL=${1?Error: DEPLOY_PREVIEW_URL not given}
SHA=${CIRCLE_SHA1}
JSON_PAYLOAD="{ \"url\": \"$DEPLOY_PREVIEW_URL\", \"sha\": \"$SHA\"}"

echo "$JSON_PAYLOAD"

curl -k -L -X POST \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --data "$JSON_PAYLOAD" \
  --request POST \
  https://learned-keeper.glitch.me/deployment

exit 0
