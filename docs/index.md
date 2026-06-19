# How AI Works: From Math to Multi-Agent Systems

A hands-on course that teaches how artificial intelligence really works — from the
linear algebra underneath it all the way up to autonomous multi-agent systems.
It's written for high-school students with a little Python and linear algebra, but
anyone curious about what happens inside a Large Language Model is welcome.

Every lesson pairs plain-English explanations with small, runnable `numpy`
examples, verified output, and exercises with worked solutions. The same math
that processes a 3-element vector is the math inside the largest models in the
world — so we learn it on toy examples you can run yourself.

## How to use this course

- **Read in order.** Each module builds on the last; the math in Module 1 powers
  everything that follows.
- **Run the code.** Click the **"Open in Colab"** badge at the top of any lesson to
  run and tweak its code in your browser — no setup required.
- **Do the exercises.** Every lesson ends with a few problems and collapsible
  solutions. Try them before peeking.
- **Look things up.** The [Glossary](glossary.md) defines every key term and links
  back to where it's introduced.

## The roadmap

1. **[The Math Behind the Magic](module-01-math/1.1-vectors.md)** — vectors, dot
   products, matrices, and how they become neurons.
2. **[How AI Understands Text](module-02-text/2.1-tokenization.md)** — turning
   language into tokens, embeddings, and comparable vectors.
3. **[Inside the Large Language Model](module-03-llm/3.1-llm-structure.md)** —
   transformers, attention, and next-token prediction.
4. **[The Art and Science of Context](module-04-context/4.1-anatomy-of-a-prompt.md)**
   — how prompts are structured and assembled.
5. **[Expanding the AI's Brain](module-05-rag-tools/5.1-limits-of-memory.md)** —
   RAG, dynamic context, and connecting to tools with MCP.
6. **[The Evolution of AI Architectures](module-06-evolution/6.1-simple-chat.md)**
   — from stateless chat to reasoning, agents, and multi-agent systems.
7. **[Capstone: Build a Mini RAG Chatbot](module-07-capstone/7.1-mini-rag-chatbot.md)**
   — assemble everything you've learned into one working project.

## Running locally

You only need Python and `numpy`:

```bash
pip install numpy
```

Then open any notebook in the `notebooks/` folder, or copy a lesson's code into a
Python file. To build and preview the site itself, see
[CONTRIBUTING](https://github.com/bzenowich/learnai/blob/main/CONTRIBUTING.md).

---

*This course is open source. Prose and lessons are licensed
[CC BY 4.0](https://github.com/bzenowich/learnai/blob/main/LICENSE-CONTENT);
code samples are licensed [MIT](https://github.com/bzenowich/learnai/blob/main/LICENSE).*
