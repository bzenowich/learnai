# Contributing

Thanks for helping improve **How AI Works**! This guide covers the repo layout,
how to make changes, and how the build pipeline works.

## Repository layout

```
docs/                     # The course — one Markdown file per lesson
  module-01-math/ ...     #   lessons, with a diagrams/ subfolder each
  glossary.md             #   key terms, linked from the lessons
  index.md                #   site home page
notebooks/                # Auto-generated Colab notebooks (do NOT edit by hand)
tools/                    # Build + validation scripts
  build_notebooks.py      #   regenerates notebooks/ from docs/
  check_snippets.py       #   runs every Python snippet
  check_links.py          #   validates internal links and #anchors
  render_diagrams.mjs     #   renders Mermaid .mmd -> .svg
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

Diagrams are written in [Mermaid](https://mermaid.js.org/) and committed as
**both** the `.mmd` source and the rendered `.svg` (so the site needs no build
step). Each lesson folder has a `diagrams/` subfolder.

To change a diagram, edit the `.mmd` file, then re-render:

```bash
make diagrams       # runs `npm install` then renders every .mmd -> .svg
```

Under the hood this runs [`@mermaid-js/mermaid-cli`](https://github.com/mermaid-js/mermaid-cli)
(`mmdc`) with [`puppeteer-config.json`](puppeteer-config.json), which sets the
sandbox flags needed in headless/CI environments. Commit both the `.mmd` and the
regenerated `.svg`.

## Before you open a pull request

Run the full check suite locally — CI runs the same checks:

```bash
make test           # snippets run, links resolve, notebooks in sync
make site           # builds the site in --strict mode (catches broken nav/links)
```

CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) additionally
re-renders the diagrams to confirm they're up to date. On every push to `main`,
the site is rebuilt and published to GitHub Pages via
[`deploy-docs.yml`](.github/workflows/deploy-docs.yml).

## Licensing

By contributing you agree that your prose/diagram contributions are licensed
under [CC BY 4.0](LICENSE-CONTENT) and your code contributions under the
[MIT License](LICENSE), matching the rest of the project.
