# How AI Works — course build tasks.
# Run `make help` to see the available targets.

.PHONY: help install notebooks diagrams test check-snippets check-links check-notebooks serve site clean

help:
	@echo "Targets:"
	@echo "  install         Install Python deps for the site and course code"
	@echo "  notebooks       Regenerate the Colab notebooks from the lesson markdown"
	@echo "  diagrams        Re-render all Mermaid (.mmd) diagrams to .svg (needs Node)"
	@echo "  test            Run all checks (snippets, links, notebooks in sync)"
	@echo "  serve           Live-preview the site at http://127.0.0.1:8000"
	@echo "  site            Build the static site into ./site"
	@echo "  clean           Remove the built site"

install:
	pip install -r requirements.txt -r requirements-docs.txt

notebooks:
	python3 tools/build_notebooks.py

diagrams:
	npm install
	npm run diagrams

check-snippets:
	python3 tools/check_snippets.py

check-links:
	python3 tools/check_links.py

# Fails if the committed notebooks are out of date with the lesson markdown.
check-notebooks:
	python3 tools/build_notebooks.py
	git diff --exit-code notebooks/ \
	  || (echo "Notebooks are out of date. Run 'make notebooks' and commit." && exit 1)

test: check-snippets check-links check-notebooks

serve:
	mkdocs serve

site:
	mkdocs build --strict

clean:
	rm -rf site
