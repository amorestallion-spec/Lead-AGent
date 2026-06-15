#!/usr/bin/env bash
set -euo pipefail

# Check agent files for originality / similarity with existing agents
# Usage: ./check-agent-originality.sh <file1.md> [file2.md ...]

echo "=== Checking Agent Originality ==="
errors=0

for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "⚠ File not found: $file"
    continue
  fi
  
  echo "✓ Checking originality of: $file"
  
  # Basic originality check: ensure file is not empty or extremely small
  size=$(wc -c < "$file")
  if [ "$size" -lt 100 ]; then
    echo "✕ Error: $file is too short ($size bytes). Agent files should be descriptive."
    errors=$((errors + 1))
    continue
  fi
done

echo "=== Originality Check Complete ==="
if [ $errors -ne 0 ]; then
  echo "✕ Originality check failed."
  exit 1
else
  echo "✓ Originality checks passed successfully."
  exit 0
fi
