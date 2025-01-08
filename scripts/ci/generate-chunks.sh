#!/bin/bash
set -eux pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# shellcheck disable=SC1091
source "$DIR"/_common.sh

BRANCH=${BRANCH:-$GITHUB_HEAD_REF}
SKIP_TESTS_ON_BRANCH=${SKIP_TESTS_ON_BRANCH:-}
if [[ "$SKIP_TESTS_ON_BRANCH" == "7913-$BRANCH" ]]; then
    #Skipping tests
    echo "[]"
else
    PROJECTS=$("$PROJECT_ROOT"/scripts/ci/_nx-affected-targets.sh "$1")
    echo >&2 "Projects: ${PROJECTS}"
    CHUNKS=$(node "$PROJECT_ROOT"/scripts/ci/_chunk.js "${PROJECTS}")
    echo >&2 "Chunks: $CHUNKS"
    echo "$CHUNKS"
fi
