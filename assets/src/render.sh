#!/usr/bin/env bash
# Rebuild the README banner: portrait behind fluted glass, then the layout via headless Chrome.
# Needs: python3 with numpy and pillow, Google Chrome, and `npm install` run once in site/ (fonts).
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
PY="${PYTHON:-python3}"
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

"$PY" "$HERE/flute.py" banner hero
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1.5 --window-size=1600,760 --virtual-time-budget=4000 \
  --screenshot="$HERE/../build/banner-raw.png" "file://$HERE/banner.html" >/dev/null 2>&1
# Chrome's viewport is shorter than the window, so shoot tall and cut to 1600x560 at 1.5x
"$PY" -c "from PIL import Image; Image.open('$HERE/../build/banner-raw.png').convert('RGB').crop((0,0,2400,840)).save('$HERE/../banner.png', optimize=True)"
echo "wrote $HERE/../banner.png"
