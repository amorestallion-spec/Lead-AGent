#!/usr/bin/env bash
set -euo pipefail

# Lint agent files for frontmatter and structure validation
# Usage: ./lint-agents.sh <file1.md> [file2.md ...]

echo "=== Linting Agent Files ==="
errors=0

for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "⚠ File not found: $file"
    continue
  fi
  
  echo "✓ Linting: $file"
  
  # Basic check: is it markdown?
  if [[ "$file" != *.md ]]; then
    echo "✕ Error: $file is not a markdown file (.md)"
    errors=$((errors + 1))
    continue
  fi

  # Basic check: does it have frontmatter starting with ---?
  first_line=$(head -n 1 "$file")
  if [[ "$first_line" != "---" ]]; then
    echo "✕ Error: $file does not start with frontmatter separator '---'"
    errors=$((errors + 1))
    continue
  fi
done

echo "=== Lint Complete ==="
if [ $errors -ne 0 ]; then
  echo "✕ Found $errors linting errors."
  exit 1
else
  echo "✓ All files passed validation."
  exit 0
fi
