#!/usr/bin/env python3
"""Put the portrait behind fluted glass: clear over the face, refracted and
fading to white toward one side. Writes a grayscale PNG with alpha.

  python3 flute.py banner   -> ../build/jacob-fluted-banner.png   (1050x840)
  python3 flute.py hero     -> ../../site/public/jacob-fluted.webp (1080x1285)
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
SRC = HERE / "jacob.jpg"

PRESETS = {
    # crop = (left, top, right, bottom) in source pixels; clear = face zone in
    # output pixels; fade = side where the glass takes over
    "banner": dict(crop=(30, 130, 970, 882), size=(1050, 840), flute=70,
                   clear=(280, 650), fade="right", top_fade=False,
                   out=HERE.parent / "build" / "jacob-fluted-banner.png"),
    "hero": dict(crop=(0, 60, 1000, 1250), size=(1080, 1285), flute=90,
                 clear=(270, 720), fade="both", top_fade=True,
                 out=HERE.parent.parent / "site" / "public" / "jacob-fluted.webp"),
}


def smooth(t):
    t = np.clip(t, 0.0, 1.0)
    return t * t * (3 - 2 * t)


def build(name):
    p = PRESETS[name]
    w, h = p["size"]
    fw = p["flute"]
    src = Image.open(SRC).convert("L").crop(p["crop"]).resize((w, h), Image.LANCZOS)
    a = np.asarray(src, dtype=np.float32)

    x = np.arange(w, dtype=np.float32)
    idx = np.floor(x / fw)
    t = (x - idx * fw) / fw                      # 0..1 inside a flute
    center = idx * fw + fw / 2

    c0, c1 = p["clear"]
    ramp = fw * 2.5                              # flutes until full strength
    right = smooth((center - c1) / ramp)
    left = smooth((c0 - center) / ramp)
    s = np.maximum(left, right)                  # glass strength per column

    # refraction: each flute shows a wider slice of the scene, compressed
    k = 1.0 + s * 1.35
    sx = center + (t - 0.5) * fw * k
    sx = np.abs(sx)                              # mirror at the edges, no smear
    sx = np.where(sx > w - 1, 2 * (w - 1) - sx, sx)
    sx = np.clip(sx, 0, w - 1)
    x0 = np.floor(sx).astype(int)
    x1 = np.clip(x0 + 1, 0, w - 1)
    f = sx - x0
    out = a[:, x0] * (1 - f) + a[:, x1] * f

    # ridge light: bright on the left shoulder of a flute, shadow on the right
    shade = 1.0 + s * (0.075 * np.cos(np.pi * t) - 0.05 * (t > 0.965) + 0.04 * (t < 0.03))
    out = out * shade[None, :]

    # lift toward white so the portrait stays quiet
    out = 255 - (255 - out) * 0.9
    out = np.clip(out, 0, 255)

    # alpha: per flute, so the fade steps in ridges like the glass does
    span = fw * (3.0 if p["fade"] == "both" else 4.5)   # flutes the fade runs over
    ax = smooth((w - fw * 0.5 - center) / span)
    if p["fade"] == "both":
        ax = ax * smooth((center - fw * 0.5) / span)
    alpha = np.tile(ax[None, :], (h, 1))
    if p["top_fade"]:
        y = np.arange(h, dtype=np.float32)[:, None]
        start = s[None, :] * h * 0.22            # outer flutes begin lower
        alpha = alpha * np.where(s[None, :] < 0.02, 1.0, smooth((y - start) / (h * 0.14)))
    # soft bottom so the cut never reads as a hard box edge on the web
    if name == "hero":
        y = np.arange(h, dtype=np.float32)[:, None]
        alpha = alpha * smooth((h - y) / (h * 0.10))

    rgba = np.dstack([out, out, out, np.clip(alpha, 0, 1) * 255]).astype(np.uint8)
    p["out"].parent.mkdir(parents=True, exist_ok=True)
    img = Image.fromarray(rgba, "RGBA")
    if p["out"].suffix == ".webp":
        img.save(p["out"], quality=84, method=6)
    else:
        img.save(p["out"], optimize=True)
    print("wrote", p["out"], rgba.shape)


if __name__ == "__main__":
    for n in (sys.argv[1:] or PRESETS):
        build(n)
