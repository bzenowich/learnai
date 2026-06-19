#!/usr/bin/env python3
"""Execute every Python snippet in the course to catch broken code.

For each lesson markdown file, all ```python blocks (lesson body + exercise
solutions) are concatenated in document order and run as a single script in a
fresh subprocess. A lesson passes if its combined script exits 0.

Run from the repo root:  python3 tools/check_snippets.py
Exit code is non-zero if any lesson's snippets fail.
"""

from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"
PYTHON_BLOCK = re.compile(r"```python\n(.*?)\n```", re.DOTALL)


def main() -> int:
    failures = 0
    checked = 0
    for md_path in sorted(DOCS.glob("module-*/*.md")):
        blocks = [b for b in PYTHON_BLOCK.findall(md_path.read_text(encoding="utf-8"))]
        if not blocks:
            continue
        checked += 1
        script = "\n\n".join(blocks)
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as fh:
            fh.write(script)
            tmp = fh.name
        result = subprocess.run(
            [sys.executable, tmp], capture_output=True, text=True, timeout=120
        )
        Path(tmp).unlink(missing_ok=True)
        rel = md_path.relative_to(REPO)
        if result.returncode != 0:
            failures += 1
            print(f"FAIL  {rel}")
            print(result.stderr.strip()[-1500:])
            print("-" * 60)
        else:
            print(f"ok    {rel}")

    print(f"\n{checked} lessons with code checked, {failures} failed.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
