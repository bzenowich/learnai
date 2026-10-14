# Educator Guide & Classroom Resources

Welcome, educators! **How AI Works: From Math to Multi-Agent Systems** was designed from the start to provide a transparent, mathematically grounded, and hype-free introduction to modern Artificial Intelligence.

Whether you are teaching an **AP Computer Science** class, high school coding club, introductory college seminar, or professional development workshop, this curriculum gives students an intuition for how LLMs and agentic systems actually work under the hood.

---

## Pedagogical Philosophy

Many introductory AI courses either:
1. Stay purely conceptual without touching any code or mathematics, or
2. Jump directly into complex frameworks (PyTorch, TensorFlow, Hugging Face, LangChain) that hide the fundamental linear algebra behind black-box functions.

**How AI Works** takes a first-principles approach:
- **No Black Boxes:** The same 3-element vector math introduced in Module 1 is the exact arithmetic running inside models with 70 billion parameters.
- **Pure Python & NumPy:** The only external dependency in the entire course is `numpy`.
- **Zero-Setup Environments:** Every lesson features one-click **"Open in Colab"** badges and built-in **"Run in Browser"** execution via WebAssembly (Pyodide), ensuring students can run code immediately on Chromebooks, school laptops, or restricted networks without local installation.
- **Formative Self-Assessment:** Every lesson includes hands-on programming exercises paired with collapsible worked solutions.

---

## Curriculum Structure & Estimated Pacing

The course is organized into 8 modular units (~15–20 instructional hours total).

| Module | Title | Estimated Time | Key Topics |
| :--- | :--- | :--- | :--- |
| **0** | **[Readiness Check](module-00-setup/0.1-readiness-check.md)** | ~45 mins | Python lists vs. NumPy arrays, `.shape`, 1D/2D slicing, broadcasting basics |
| **1** | **[The Math Behind the Magic](module-01-math/1.1-vectors.md)** | ~2.5 hours | Vectors, dot products, matrices, matrix-vector multiplication, artificial neurons |
| **2** | **[How AI Understands Text](module-02-text/2.1-tokenization.md)** | ~2 hours | Tokenization, subwords, word embeddings, cosine similarity, vector space geometry |
| **3** | **[Inside the LLM](module-03-llm/3.1-llm-structure.md)** | ~3 hours | Transformer layers, self-attention, softmax, next-token prediction, loss & gradients |
| **4** | **[Context & Prompting](module-04-context/4.1-anatomy-of-a-prompt.md)** | ~1.5 hours | Anatomy of prompts, system instructions, context windows, prompt pipelines |
| **5** | **[Expanding the AI's Brain](module-05-rag-tools/5.1-limits-of-memory.md)** | ~2.5 hours | Memory limits, hallucination, RAG vector retrieval, Model Context Protocol (MCP) |
| **6** | **[Evolution of AI Architectures](module-06-evolution/6.1-simple-chat.md)** | ~2.5 hours | Stateless chat, reasoning loops (Chain-of-Thought), tool calling, autonomous agents |
| **7** | **[Capstone Projects](module-07-capstone/7.1-mini-rag-chatbot.md)** | ~3 hours | Building a RAG bot from scratch; implementing an autonomous ReAct agent loop |

### Suggested Pacing Models

- **1-Week Intensive / Summer Camp (3–4 hours/day):** Complete Modules 0–3 during Days 1–3, Modules 4–6 on Day 4, and Capstones 7.1 & 7.2 on Day 5.
- **4-Week Unit (4–5 hours/week):**
  - *Week 1:* Modules 0 & 1 (NumPy & Linear Algebra foundations)
  - *Week 2:* Modules 2 & 3 (Text processing & Transformer internals)
  - *Week 3:* Modules 4 & 5 (Prompting, Context, and RAG)
  - *Week 4:* Modules 6 & 7 (Autonomous Agents & Capstone Projects)
- **Full Semester Integration:** Teach one module every two weeks alongside broader computer science or linear algebra coursework.

---

## Standards Alignment

This curriculum maps naturally to high school and introductory college standards:

### CSTA K-12 Computer Science Standards
- **3A-DA-11 / 3B-DA-06 (Data & Analysis):** Create interactive data representations, vectors, and embeddings to model relationships in text.
- **3A-AP-13 / 3B-AP-10 (Algorithms & Programming):** Implement multi-step algorithms (matrix transformations, attention scoring, vector search, and feedback loops).
- **3A-IC-24 / 3B-IC-25 (Impacts of Computing):** Analyze the capabilities, limitations, hallucinations, and safety mechanisms (RLHF) of generative AI models.

### AP Computer Science Principles
- **Big Idea 2 (Data):** Binary and numerical representation of real-world phenomena (text to vector embeddings).
- **Big Idea 3 (Algorithms and Programming):** Algorithmic problem-solving through iteration, procedures, and simulation.
- **Big Idea 5 (Impact of Computing):** Societal implications of autonomous decision-making agents and training data biases.

---

## Classroom Implementation Options

### 1. Zero-Install: Web Browser & Pyodide
Students can read the curriculum at [bzenowich.github.io/learnai](https://bzenowich.github.io/learnai/) and click the **"Run in Browser"** button on any code block. They can also click **"Edit"** to modify numerical values and observe outputs immediately—no accounts or logins required.

### 2. Google Colab Notebooks
Every lesson header provides an **"Open in Colab"** badge. Students with Google accounts can open, execute, and save annotated copies of the notebooks directly to Google Drive.

### 3. GitHub Classroom / Autograded Assignments
If you use GitHub Classroom, you can have students fork or clone the repository:
```bash
git clone https://github.com/bzenowich/learnai.git
cd learnai
pip install -r requirements.txt
```
Students can test their code snippets and exercises locally using the provided validation script:
```bash
python3 tools/check_snippets.py
```

---

## Permissive Open-Source Licensing

All educational content, diagrams, exercises, and tutorials in this course are licensed under **Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))**. All code snippets and utilities are licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.

You are free to:
- Share, copy, and redistribute the material in any medium or format.
- Adapt, remix, transform, and build upon the material for classroom lectures, slides, and homework assignments.
- Use the material in non-commercial and commercial educational settings, provided appropriate credit is given.

---

## Need Assistance or Feedback?

Have suggestions for additional classroom modules, lesson adaptations, or teacher guides? Open an issue or discussion on the course repository: [github.com/bzenowich/learnai](https://github.com/bzenowich/learnai).
