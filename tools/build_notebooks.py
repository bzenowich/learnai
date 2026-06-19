#!/usr/bin/env python3
"""Generate Colab-ready Jupyter notebooks from the course lesson markdown.

For each lesson at docs/module-XX/<name>.md this writes a matching notebook at
notebooks/module-XX/<name>.ipynb. The notebook contains:

  * a title cell linking back to the lesson,
  * a setup cell that installs numpy (a no-op once it is already present),
  * one code cell per ```python block in the lesson body (before "## Exercises"),
  * a trailing markdown cell with the lesson's Exercises section.

Notebooks are generated artifacts -- edit the markdown, not the .ipynb files.
Run from the repo root:  python3 tools/build_notebooks.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"
NOTEBOOKS = REPO / "notebooks"

PYTHON_BLOCK = re.compile(r"```python\n(.*?)\n```", re.DOTALL)
COLAB_BADGE = re.compile(r"^\[!\[Open In Colab\].*$", re.MULTILINE)


def lesson_files() -> list[Path]:
    return sorted(DOCS.glob("module-*/*.md"))


def build_notebook(md_path: Path) -> dict:
    text = md_path.read_text(encoding="utf-8")
    text = COLAB_BADGE.sub("", text)

    # Title = first H1.
    title_match = re.search(r"^#\s+(.*)$", text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else md_path.stem

    # Split lesson body from the Exercises section.
    parts = re.split(r"^##\s+Exercises\s*$", text, maxsplit=1, flags=re.MULTILINE)
    body = parts[0]
    exercises = ("## Exercises\n" + parts[1]) if len(parts) > 1 else ""

    code_blocks = [b.strip("\n") for b in PYTHON_BLOCK.findall(body) if b.strip()]

    cells: list[dict] = []
    cells.append(
        md_cell(
            f"# {title}\n\n"
            "Interactive notebook for the **How AI Works** course. "
            "Run each cell top to bottom (Shift+Enter). "
            "The text and explanations live in the lesson page."
        )
    )
    cells.append(code_cell("# Setup: install the one dependency this course uses.\n"
                           "%pip install numpy --quiet"))
    for block in code_blocks:
        cells.append(code_cell(block))

    if exercises.strip():
        cells.append(
            md_cell(
                exercises.strip()
                + "\n\n*Try each exercise in a new cell below before opening the solution.*"
            )
        )

    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3",
            },
            "language_info": {"name": "python"},
        },
        "nbformat": 4,
        "nbformat_minor": 4,
    }


def md_cell(source: str) -> dict:
    return {"cell_type": "markdown", "metadata": {}, "source": splitlines_keepends(source)}


def code_cell(source: str) -> dict:
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": splitlines_keepends(source),
    }


def splitlines_keepends(text: str) -> list[str]:
    # nbformat stores source as a list of lines, each ending in \n except the last.
    lines = text.splitlines()
    return [line + "\n" for line in lines[:-1]] + [lines[-1]] if lines else [""]


def main() -> int:
    written = 0
    for md_path in lesson_files():
        rel = md_path.relative_to(DOCS)
        nb_path = NOTEBOOKS / rel.with_suffix(".ipynb")
        nb_path.parent.mkdir(parents=True, exist_ok=True)
        nb = build_notebook(md_path)
        nb_path.write_text(json.dumps(nb, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
        written += 1
        print(f"wrote {nb_path.relative_to(REPO)}")
    print(f"\n{written} notebooks generated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
