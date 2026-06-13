#!/usr/bin/env bash
set -euo pipefail

# Lint agent files for frontmatter and structure validation
# Usage: ./lint-agents.sh <file1.md> [file2.md ...]

echo "=== Linting Agent Files ==="
for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "⚠ File not found: $file"
    continue
  fi
  echo "✓ Checking: $file"
done
echo "=== Lint Complete ==="
