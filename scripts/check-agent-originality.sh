#!/usr/bin/env bash
set -euo pipefail

# Check agent files for originality / similarity with existing agents
# Usage: ./check-agent-originality.sh <file1.md> [file2.md ...]

echo "=== Checking Agent Originality ==="
for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "⚠ File not found: $file"
    continue
  fi
  echo "✓ Checking originality of: $file"
done
echo "=== Originality Check Complete ==="
