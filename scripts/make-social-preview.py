#!/usr/bin/env python3
"""
Writes public/social-preview.jpg (1200x630), the og:image / twitter:image.

Run manually: python3 scripts/make-social-preview.py
Needs Pillow and the Noto Serif Display font (SIL OFL). Not part of the build;
the output is committed. The avatar original in avatar/ is only read.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
AVATAR = ROOT / "avatar/regular.png"
OUTPUT = ROOT / "public/social-preview.jpg"
FONT_DIR = Path("/usr/share/fonts/truetype/noto")

WIDTH, HEIGHT = 1200, 630
INK = (43, 29, 19)
INK_SOFT = (90, 68, 46)
BURGUNDY = (122, 31, 43)
GOLD_INK = (148, 114, 58)
MAX_BYTES = 200 * 1024


def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)


def main():
    avatar = Image.open(AVATAR).convert("RGB")
    # Sample the avatar's own parchment so the portrait sits on a matching sheet.
    corner = avatar.crop((0, 0, 40, 40)).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    canvas = Image.new("RGB", (WIDTH, HEIGHT), corner)

    # Soft darkened edges, like the site's parchment.
    vignette = Image.new("L", (WIDTH, HEIGHT), 0)
    ImageDraw.Draw(vignette).rectangle((40, 40, WIDTH - 40, HEIGHT - 40), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(60))
    shade = Image.new("RGB", (WIDTH, HEIGHT), (176, 140, 92))
    canvas = Image.composite(canvas, shade, vignette)

    portrait_h = 540
    portrait_w = round(avatar.width * portrait_h / avatar.height)
    portrait = avatar.resize((portrait_w, portrait_h), Image.LANCZOS)
    mask = Image.new("L", portrait.size, 0)
    ImageDraw.Draw(mask).rectangle((24, 24, portrait_w - 24, portrait_h - 24), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(18))
    canvas.paste(portrait, (WIDTH - portrait_w - 20, (HEIGHT - portrait_h) // 2), mask)

    draw = ImageDraw.Draw(canvas)
    x = 80
    draw.text((x, 150), "THE ADVENTURES OF", font=font("NotoSerif-Bold.ttf", 24), fill=BURGUNDY, spacing=4)
    draw.text((x, 190), "Prashast Vats", font=font("NotoSerifDisplay-Regular.ttf", 76), fill=INK)
    draw.text((x, 300), "Software Engineer", font=font("NotoSerifDisplay-Italic.ttf", 44), fill=INK_SOFT)
    draw.line((x, 385, x + 300, 385), fill=GOLD_INK, width=2)
    draw.ellipse((x + 144, 379, x + 156, 391), fill=GOLD_INK)
    draw.text((x, 420), "prashastvats1.github.io", font=font("NotoSerif-Regular.ttf", 28), fill=INK_SOFT)

    for quality in (85, 80, 75, 70):
        canvas.save(OUTPUT, "JPEG", quality=quality, optimize=True, progressive=True)
        if OUTPUT.stat().st_size <= MAX_BYTES:
            break
    print(f"{OUTPUT.relative_to(ROOT)}  {OUTPUT.stat().st_size // 1024} KB (q={quality})")


if __name__ == "__main__":
    main()
