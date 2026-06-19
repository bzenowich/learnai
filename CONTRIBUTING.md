# Contributing

Thanks for helping improve **How AI Works**! This guide covers the repo layout,
how to make changes, and how the build pipeline works.

## Repository layout

```
docs/                     # The course — one Markdown file per lesson
  module-01-math/ ...     #   lessons, with a diagrams/ subfolder each (.svg)
  glossary.md             #   key terms, linked from the lessons
  index.md                #   site home page
notebooks/                # Auto-generated Colab notebooks (do NOT edit by hand)
tools/                    # Build + validation scripts
  build_notebooks.py      #   regenerates notebooks/ from docs/
  check_snippets.py       #   runs every Python snippet
  check_links.py          #   validates internal links and #anchors
mkdocs.yml                # Site configuration (MkDocs Material)
```

## Getting set up

```bash
make install        # installs numpy + MkDocs Material
make serve          # live-preview the site at http://127.0.0.1:8000
```

## Editing lessons

Lessons are plain Markdown. A few conventions keep the course consistent:

- **Start with an H1 title**, then the "Open in Colab" badge, then the content.
- **Show real output.** After a code block that prints, add a short
  `Running this prints:` line and a fenced ` ```text ` block with the *actual*
  output. Run the code first — don't guess.
- **End with `## Exercises`**, each exercise wrapped in a
  `<details><summary>Show solution</summary>` block with verified solution code.
- **Link key terms** to the [glossary](docs/glossary.md) the first time they
  appear, e.g. `[embedding](../glossary.md#embedding)`.

After editing a lesson's code, regenerate its notebook:

```bash
make notebooks      # rebuilds notebooks/ from the lessons
```

## Editing diagrams

Diagrams are **hand-authored SVG files** committed directly under each lesson's
`diagrams/` subfolder, and referenced from the Markdown with a normal image tag,
e.g. `![Vector Diagram](diagrams/vector.svg)`. There is no build or render step —
edit the `.svg` and commit it.

A few conventions keep them consistent and readable on both the light and dark
site themes:

- **Self-contained.** No external fonts, scripts, or CSS — an `<img>`-loaded SVG
  can't see the page's styles. Use a system font stack and inline all styling.
- **A light card.** Each diagram sits on a rounded white card (`fill="#ffffff"`,
  a subtle border, and a soft drop shadow) so it reads cleanly on either theme.
- **Shared palette.** Indigo (`#4f46e5`) as the primary accent to match the
  Material theme, with slate text and emerald / amber / rose / sky accents.
- **Pick a viewBox** sized to the content and set matching `width`/`height`; the
  site scales images responsively.
- **Add a descriptive `aria-label`** on the root `<svg>` for accessibility.

To preview a single diagram while iterating, open the `.svg` directly in a
browser, or run `make serve` and view the lesson page.

## Before you open a pull request

Run the full check suite locally — CI runs the same checks:

```bash
make test           # snippets run, links resolve, notebooks in sync
make site           # builds the site in --strict mode (catches broken nav/links)
```

CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs these same
checks and builds the site in strict mode. On every push to `main`, the site is
rebuilt and published to GitHub Pages via
[`deploy-docs.yml`](.github/workflows/deploy-docs.yml).

## Licensing

By contributing you agree that your prose/diagram contributions are licensed
under [CC BY 4.0](LICENSE-CONTENT) and your code contributions under the
[MIT License](LICENSE), matching the rest of the project.
