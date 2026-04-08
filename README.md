# How AI Works: From Math to Multi-Agent Systems

This course is designed to teach high-school students with a baseline understanding of Python and linear algebra how artificial intelligence works from the ground up.

## Table of Contents

### Module 1: The Math Behind the Magic
*Focus: Grounding the math in Python (`numpy`) to show how data is manipulated.*
* **1.1 Vectors:** The Building Blocks of AI Data (Concepts & Python examples with 3-element vectors).
* **1.2 Vector Dot Products:** Measuring Similarity and Alignment.
* **1.3 Matrices:** Representing Transformations (Concepts & Python examples with 3x3 matrices).
* **1.4 Matrix-Vector Multiplication:** The Engine of AI (3x3 matrix * 3x1 vector calculations).
* **1.5 From Math to Neurons:** Introducing weights, biases, and basic activation functions using the math from the previous sections.

### Module 2: How AI Understands Text
*Focus: Translating human language into mathematical structures.*
* **2.1 Tokenization:** Breaking down text into representable chunks (with Python examples of simple tokenizers).
* **2.2 Embeddings:** Encoding words and questions into dense vectors of numbers.
* **2.3 Vector Space & Similarity:** Using dot products (from 1.2) to find similar words programmatically.

### Module 3: Inside the Large Language Model
*Focus: High-level architecture and the flow of data.*
* **3.1 LLM Structure Overview:** A simplified look at the Transformer architecture.
* **3.2 The Attention Mechanism:** How models mathematically weigh the importance of different words in a sentence.
* **3.3 Layer by Layer:** How the prompt vector is transformed and applied against the LLM in successive stages.
* **3.4 Next-Token Prediction:** Understanding the fundamental loop—how the model guesses one word at a time based on probability.

### Module 4: The Art and Science of Context
*Focus: How inputs are structured before hitting the model.*
* **4.1 Anatomy of a Prompt:** Breaking down system instructions, historical chat context, user questions, and referenced files.
* **4.2 The Prompt Pipeline:** How formatting works under the hood (input transformations, context amplification/templating, output formatting).

### Module 5: Expanding the AI's Brain (RAG & Tools)
*Focus: Overcoming the limits of static model weights and connecting to the real world.*
* **5.1 The Limits of Memory:** Why models hallucinate and why we need external data.
* **5.2 Retrieval-Augmented Generation (RAG):** How it works (embedding documents, searching via dot product, injecting context).
* **5.3 Dynamic Context:** The logic of how and when external resources (web search, databases, APIs) are pulled into the context window.
* **5.4 Connecting to the World with MCP:** 
    * What the Model Context Protocol (MCP) is and why it's necessary.
    * How MCP works (Client-Server architecture for AI).
    * Examples of pre-built MCP tools (e.g., File system, GitHub, SQLite).
    * Where to find them and how they are used by an LLM to take action.

### Module 6: The Evolution of AI Architectures
*Focus: Tracing the path from simple bots to autonomous systems.*
* **6.1 Level 1: Simple Generative Chat:** Stateless, single-turn interactions.
* **6.2 Level 2: Context-Aware Models:** Managing conversation history.
* **6.3 Level 3: Reasoning & Feedback Loops:** Chain-of-thought, self-correction, and refining outputs based on internal evaluation.
* **6.4 Level 4: Agentic AI:** Empowering models to use software commands and tools.
* **6.5 Level 5: Thinking Models & Multi-Agent Systems:** Planning, executing multiple steps, and delegating tasks across specialized worker threads/agents.
