#!/usr/bin/env python3
"""Validate internal Markdown links and image references across the course.

Checks every relative link/image target in docs/*.md:
  * the target file exists, and
  * if the link has a #anchor, a heading slugifying to that anchor exists
    in the target file.

External links (http/https/mailto) are ignored. Run from the repo root:
    python3 tools/check_links.py
Exit code is non-zero if any link is broken.
"""

from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"

LINK = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
HEADING = re.compile(r"^#{1,6}\s+(.*?)\s*$", re.MULTILINE)


def slugify(heading: str) -> str:
    # Mirrors Python-Markdown / MkDocs default toc slugify.
    text = heading.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text.strip())
    return text


def anchors_for(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    return {slugify(h) for h in HEADING.findall(text)}


def main() -> int:
    anchor_cache: dict[Path, set[str]] = {}
    broken: list[str] = []

    for md_path in sorted(DOCS.glob("**/*.md")):
        text = md_path.read_text(encoding="utf-8")
        for target in LINK.findall(text):
            target = target.strip()
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            file_part, _, anchor = target.partition("#")
            resolved = (md_path.parent / file_part).resolve()
            if not resolved.exists():
                broken.append(f"{md_path.relative_to(REPO)} -> {target} (missing file)")
                continue
            if anchor and resolved.suffix == ".md":
                if resolved not in anchor_cache:
                    anchor_cache[resolved] = anchors_for(resolved)
                if anchor not in anchor_cache[resolved]:
                    broken.append(
                        f"{md_path.relative_to(REPO)} -> {target} (missing anchor #{anchor})"
                    )

    if broken:
        print("Broken links found:")
        for b in broken:
            print(f"  {b}")
        print(f"\n{len(broken)} broken link(s).")
        return 1
    print("All internal links and anchors resolve.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
