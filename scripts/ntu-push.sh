#!/usr/bin/env bash
set -e

if ! command -v jq &> /dev/null; then
  echo "❌ jq is required. Install via: brew install jq"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not inside a git repository"
  exit 1
fi

ROOT=$(git rev-parse --show-toplevel)

# Get prefix (support git alias)
if [[ -n "$GIT_PREFIX" ]]; then
  PREFIX="${GIT_PREFIX%/}"
else
  PREFIX=$(git rev-parse --show-prefix | sed 's:/$::')
fi

if [[ -z "$PREFIX" ]]; then
  echo "❌ You are at repo root; no subtree to push"
  exit 1
fi

CONF="$ROOT/subtree-remotes.json"

if [[ ! -f "$CONF" ]]; then
  echo "❌ Missing subtree-remotes.json"
  exit 1
fi

REMOTE=$(jq -r --arg p "$PREFIX" '.[$p].remote // empty' "$CONF")
BRANCH=$(jq -r --arg p "$PREFIX" '.[$p].branch // "main"' "$CONF")

if [[ -z "$REMOTE" ]]; then
  echo "❌ No remote config found for prefix: $PREFIX"
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "❌ Remote '$REMOTE' not found"
  exit 1
fi

echo "========================================"
echo " NTU subtree push"
echo " Prefix : $PREFIX"
echo " Remote : $REMOTE"
echo " Branch : $BRANCH"
echo "========================================"

read -p "👉 Push this subtree? (y/N): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "❌ Aborted"
  exit 1
fi

git subtree push \
  --prefix="$PREFIX" \
  "$REMOTE" \
  "$BRANCH"

echo "✅ Pushed '$PREFIX' → '$REMOTE ($BRANCH)'"
