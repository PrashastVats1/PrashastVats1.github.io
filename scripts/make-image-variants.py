#!/usr/bin/env python3
"""
Writes the responsive WebP variants that are committed under public/assets/.

Run manually after replacing a source image: python3 scripts/make-image-variants.py
Needs Pillow with WebP support. Not part of the build; the outputs are committed.
Source images are only read. Variant widths must match src/assets/manifest.js.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

GROUPS = [
    # (source files, output dir, widths)
    (sorted((PUBLIC / "assets/artifacts").glob("*.webp")), PUBLIC / "assets/artifacts", (480, 720, 960)),
    (sorted((PUBLIC / "assets/lab").glob("*.webp")), PUBLIC / "assets/lab", (320, 560)),
    ([ROOT / "avatar/regular.webp", ROOT / "avatar/scholar.webp"], PUBLIC / "assets/avatar", (96, 192, 384)),
]

SKIP = {"projects.webp", "laboratory.webp"}  # full-bleed scenes, already near display size


def is_variant(path):
    return path.stem.rsplit("-", 1)[-1].isdigit()


def main():
    for sources, out_dir, widths in GROUPS:
        out_dir.mkdir(parents=True, exist_ok=True)
        for src in sources:
            if src.name in SKIP or is_variant(src) or not src.exists():
                continue
            with Image.open(src) as image:
                image.load()
                for width in widths:
                    if width >= image.width:
                        continue
                    height = round(image.height * width / image.width)
                    target = out_dir / f"{src.stem}-{width}.webp"
                    image.resize((width, height), Image.LANCZOS).save(target, "WEBP", quality=80, method=6)
                    print(f"{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
