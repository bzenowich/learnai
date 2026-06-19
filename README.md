# How AI Works: From Math to Multi-Agent Systems

[![CI](https://github.com/bzenowich/learnai/actions/workflows/ci.yml/badge.svg)](https://github.com/bzenowich/learnai/actions/workflows/ci.yml)
[![Deploy](https://github.com/bzenowich/learnai/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/bzenowich/learnai/actions/workflows/deploy-docs.yml)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

A hands-on course that teaches how artificial intelligence really works — from the
linear algebra underneath it all the way up to autonomous multi-agent systems. It
is designed for high-school students with a baseline understanding of Python and
linear algebra, but it's for anyone curious about what happens inside a Large
Language Model.

**📖 Read it as a website: <https://bzenowich.github.io/learnai/>**

Every lesson pairs plain-English explanations with small, runnable `numpy`
examples (verified output included) and exercises with worked solutions. Each
lesson has an **"Open in Colab"** badge so you can run and tweak the code in your
browser with zero setup.

## Table of Contents

### Module 1: The Math Behind the Magic
* [1.1 Vectors](docs/module-01-math/1.1-vectors.md) — the building blocks of AI data
* [1.2 Vector Dot Products](docs/module-01-math/1.2-dot-products.md) — measuring similarity
* [1.3 Matrices](docs/module-01-math/1.3-matrices.md) — representing transformations
* [1.4 Matrix-Vector Multiplication](docs/module-01-math/1.4-matrix-vector-multiplication.md) — the engine of AI
* [1.5 From Math to Neurons](docs/module-01-math/1.5-from-math-to-neurons.md) — weights, biases, activations

### Module 2: How AI Understands Text
* [2.1 Tokenization](docs/module-02-text/2.1-tokenization.md) — text into representable chunks
* [2.2 Embeddings](docs/module-02-text/2.2-embeddings.md) — encoding meaning as vectors
* [2.3 Vector Space & Similarity](docs/module-02-text/2.3-vector-space-similarity.md) — finding similar words

### Module 3: Inside the Large Language Model
* [3.1 LLM Structure](docs/module-03-llm/3.1-llm-structure.md) — the Transformer architecture
* [3.2 The Attention Mechanism](docs/module-03-llm/3.2-attention-mechanism.md) — weighing importance
* [3.3 Layer by Layer](docs/module-03-llm/3.3-layer-by-layer.md) — transforming the prompt vector
* [3.4 Next-Token Prediction](docs/module-03-llm/3.4-next-token-prediction.md) — the fundamental loop

### Module 4: The Art and Science of Context
* [4.1 Anatomy of a Prompt](docs/module-04-context/4.1-anatomy-of-a-prompt.md)
* [4.2 The Prompt Pipeline](docs/module-04-context/4.2-prompt-pipeline.md)

### Module 5: Expanding the AI's Brain (RAG & Tools)
* [5.1 The Limits of Memory](docs/module-05-rag-tools/5.1-limits-of-memory.md)
* [5.2 Retrieval-Augmented Generation (RAG)](docs/module-05-rag-tools/5.2-rag.md)
* [5.3 Dynamic Context](docs/module-05-rag-tools/5.3-dynamic-context.md)
* [5.4 Connecting to the World with MCP](docs/module-05-rag-tools/5.4-mcp.md)

### Module 6: The Evolution of AI Architectures
* [6.1 Simple Generative Chat](docs/module-06-evolution/6.1-simple-chat.md)
* [6.2 Context-Aware Models](docs/module-06-evolution/6.2-context-aware.md)
* [6.3 Reasoning & Feedback Loops](docs/module-06-evolution/6.3-reasoning.md)
* [6.4 Agentic AI](docs/module-06-evolution/6.4-agentic-ai.md)
* [6.5 Thinking Models & Multi-Agent Systems](docs/module-06-evolution/6.5-thinking-multi-agent.md)

### Module 7: Capstone
* [7.1 Build a Mini RAG Chatbot](docs/module-07-capstone/7.1-mini-rag-chatbot.md) — assemble everything into one working project

📚 A [Glossary](docs/glossary.md) defines every key term and links back to where it's introduced.

## Running the code

The course code needs only Python and `numpy`:

```bash
pip install -r requirements.txt
```

Then open any notebook in [`notebooks/`](notebooks/), click an **Open in Colab**
badge, or copy a lesson's snippets into a Python file.

## Building the site locally

```bash
make install     # MkDocs Material + course deps
make serve       # preview at http://127.0.0.1:8000
make test        # run snippets, check links, verify notebooks are in sync
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, including how the
diagram pipeline (Mermaid `.mmd` → `.svg`) works.

## License

* **Content** (lessons, explanations, diagrams, exercises): [CC BY 4.0](LICENSE-CONTENT)
* **Code** (snippets, `tools/`): [MIT](LICENSE)
