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
CONF="$ROOT/subtree-remotes.json"

if [[ ! -f "$CONF" ]]; then
  echo "❌ Missing subtree-remotes.json"
  exit 1
fi

jq -S . $CONF > tmp && mv tmp $CONF

echo "========================================"
echo " NTU Bootstrap (all subtrees)"
echo "========================================"

# 讀所有 prefix key
PREFIXES=$(jq -r 'keys[]' "$CONF")

for PREFIX in $PREFIXES; do

  REMOTE=$(jq -r --arg p "$PREFIX" '.[$p].remote' "$CONF")
  URL=$(jq -r --arg p "$PREFIX" '.[$p].url' "$CONF")
  DESC=$(jq -r --arg p "$PREFIX" '.[$p].description // "subtree init"' "$CONF")
  BRANCH=$(jq -r --arg p "$PREFIX" '.[$p].branch // "main"' "$CONF")

  echo
  echo "----------------------------------------"
  echo " Prefix      : $PREFIX"
  echo " Remote      : $REMOTE"
  echo " URL         : $URL"
  echo " Branch      : $BRANCH"
  echo "----------------------------------------"

  # 1️⃣ Remote 不存在就加
  if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
    echo "➕ Adding remote $REMOTE"
    git remote add "$REMOTE" "$URL"
    git fetch "$REMOTE"
  else
    echo "✔ Remote exists"
  fi

  # 2️⃣ Subtree 不存在才 add
  if [[ ! -d "$ROOT/$PREFIX" ]]; then
    echo "➕ Adding subtree..."
    git subtree add \
      --prefix="$PREFIX" \
      "$REMOTE" \
      "$BRANCH" \
      -m "$DESC"
  else
    echo "✔ Subtree already exists"
  fi

done

echo
echo "✅ All subtrees processed"
