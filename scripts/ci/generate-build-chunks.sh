#!/bin/bash
set -eux pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
# shellcheck disable=SC1091
source "$DIR"/_common.sh

chunks='[]'
for target in "$@"; do
    affected_chunks=$("$PROJECT_ROOT"/scripts/ci/generate-chunks.sh "$target")
    if [[ "$affected_chunks" != "" ]]; then
        chunks=$(echo "$chunks" | jq -cM --argjson target "$affected_chunks" '. + ($target | map({projects: ., docker_type: "'"$target"'"}))')
    fi
done

echo >&2 "Map: ${chunks}"
echo "$chunks" | jq -cM '. | map("\(.|tostring)")'
