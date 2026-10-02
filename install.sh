#!/usr/bin/env bash
# Install the Jacobilicious skills into ~/.claude. Safe to re-run. Never deletes: an older copy moves to the archive.
set -u
SRC="$(cd "$(dirname "$0")" && pwd)"
SKILLS="$HOME/.claude/skills"
ARCHIVE="$HOME/.claude/skills-archive"
HOMEBASE="$HOME/.claude/jacobilicious"
STAMP="$(date '+%Y%m%d-%H%M%S')"

[ "$(uname)" = "Darwin" ] || { echo "This version supports macOS only."; exit 1; }
mkdir -p "$SKILLS" "$HOMEBASE" || { echo "Cannot write to ~/.claude."; exit 1; }

for s in "$SRC"/skills/*/; do
  n="$(basename "$s")"
  if [ -e "$SKILLS/$n" ] || [ -L "$SKILLS/$n" ]; then
    mkdir -p "$ARCHIVE"
    mv "$SKILLS/$n" "$ARCHIVE/$n-$STAMP" && echo "  moved older $n to skills-archive/$n-$STAMP"
  fi
  cp -R "$s" "$SKILLS/$n" && echo "  installed $n"
done
chmod +x "$SKILLS"/jacobilicious-setup/assets/repo/bin/* "$SKILLS"/jacobilicious-setup/assets/repo/.githooks/* 2>/dev/null
cp "$SRC/brand.md" "$HOMEBASE/brand.md" && echo "  installed brand.md"

printf '\nDone. Open Claude Code and type: /jacobilicious-setup\n'
