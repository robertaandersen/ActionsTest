#!/bin/bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT="$DIR/../.."

echo "ROOT IS $ROOT"

tempRepo=$(mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir')

cp -r "$ROOT/.github/actions/dist/." "$tempRepo"
// DEBUG
export NX_AFFECTED_ALL=true
echo "NX_AFFECTED_ALL=$NX_AFFECTED_ALL" >>"$GITHUB_ENV"
exit 0

LAST_GOOD_BUILD=$(DEBUG="*,-simple-git" REPO_ROOT="$ROOT" node "$tempRepo/main.js")
if echo "$LAST_GOOD_BUILD" | grep -q 'full_rebuild_needed'; then
  export NX_AFFECTED_ALL=true
  echo "NX_AFFECTED_ALL=$NX_AFFECTED_ALL" >>"$GITHUB_ENV"
  exit 0
fi
echo "Stickman done"
LAST_GOOD_BUILD_SHA=$(echo "$LAST_GOOD_BUILD" | jq -r '.sha')
LAST_GOOD_BUILD_BRANCH=$(echo "$LAST_GOOD_BUILD" | jq -r '.branch')
LAST_GOOD_BUILD_RUN_NUMBER=$(echo "$LAST_GOOD_BUILD" | jq -r '.run_number')
BUILD_REF=$(echo "$LAST_GOOD_BUILD" | jq -r '.ref')
echo >&2 "Last successful build is with SHA '$LAST_GOOD_BUILD_SHA', branch '$LAST_GOOD_BUILD_BRANCH' and number '$LAST_GOOD_BUILD_RUN_NUMBER'"
if [[ "$BUILD_REF" != "$LAST_GOOD_BUILD_SHA" ]]; then
  echo "This will be an incremental build from a previous successful run in this PR. See parents of the commit below."
  git log -1 "$BUILD_REF"
fi
LAST_GOOD_BUILD_DOCKER_BRANCH_TAG=$(echo "${LAST_GOOD_BUILD_BRANCH}" | tr "/." "-")
export LAST_GOOD_BUILD_DOCKER_TAG=${LAST_GOOD_BUILD_DOCKER_BRANCH_TAG:0:45}_${LAST_GOOD_BUILD_SHA:0:10}_${LAST_GOOD_BUILD_RUN_NUMBER}
if [[ "$BUILD_REF" == "null" || "$BUILD_REF" == "" ]]; then
  echo "report to slack?"
  exit 1
else
  BASE="$BUILD_REF"
fi
export BASE
echo >&2 "Last successful docker tag '$LAST_GOOD_BUILD_DOCKER_TAG'"
