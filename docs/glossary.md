# Glossary

A quick reference for the key terms used throughout the course. Each entry links
to the lesson where the idea is introduced. Terms are grouped by module but you
can jump straight to any of them from the links sprinkled through the lessons.

## Module 1 — The Math Behind the Magic

### Vector
An ordered list of numbers, e.g. `[5.0, 4.0, 10.0]`. The fundamental data
structure of AI: words, images, and concepts are all turned into vectors before
a model processes them. See [1.1 Vectors](module-01-math/1.1-vectors.md).

### Dot Product
A way to multiply two vectors into a single number that measures how much they
"agree" or point in the same direction. The core similarity operation in AI. See
[1.2 Vector Dot Products](module-01-math/1.2-dot-products.md).

### Cosine Similarity
A normalized dot product whose result always falls between -1 and 1, regardless
of vector length. Used to compare meaning without being skewed by magnitude. See
[1.2 Vector Dot Products](module-01-math/1.2-dot-products.md) and
[2.3 Vector Space & Similarity](module-02-text/2.3-vector-space-similarity.md).

### Matrix
A rectangular grid of numbers that represents a transformation — a rule for
turning one vector into another. See [1.3 Matrices](module-01-math/1.3-matrices.md).

### Matrix-Vector Multiplication
The operation that applies a matrix (a transformation) to a vector, producing a
new vector. The basic computation inside every neural network layer. See
[1.4 Matrix-Vector Multiplication](module-01-math/1.4-matrix-vector-multiplication.md).

### Neuron
A tiny function that takes a vector of inputs, computes a weighted sum (a dot
product), adds a bias, and passes the result through an activation function. See
[1.5 From Math to Neurons](module-01-math/1.5-from-math-to-neurons.md).

### Weights and Biases
The numbers a neural network learns. Weights scale each input; the bias shifts
the result. Together they define what a neuron computes. See
[1.5 From Math to Neurons](module-01-math/1.5-from-math-to-neurons.md).

### Activation Function
A function applied to a neuron's output that introduces non-linearity, letting
networks learn complex patterns (e.g. ReLU). See
[1.5 From Math to Neurons](module-01-math/1.5-from-math-to-neurons.md).

## Module 2 — How AI Understands Text

### Tokenization
Splitting text into smaller chunks ("tokens") that a model can map to numbers.
See [2.1 Tokenization](module-02-text/2.1-tokenization.md).

### Embedding
A dense vector that captures the *meaning* of a token, word, or sentence, so that
similar meanings sit close together in vector space. See
[2.2 Embeddings](module-02-text/2.2-embeddings.md).

### Vector Space
The high-dimensional space embeddings live in, where distance and direction
correspond to similarity in meaning. See
[2.3 Vector Space & Similarity](module-02-text/2.3-vector-space-similarity.md).

## Module 3 — Inside the Large Language Model

### Transformer
The neural-network architecture behind modern LLMs. It refines token vectors
layer by layer, primarily using attention. See
[3.1 LLM Structure](module-03-llm/3.1-llm-structure.md).

### Attention
The mechanism that lets a model weigh how much each token should "look at" every
other token, updating each token's vector with relevant context. See
[3.2 The Attention Mechanism](module-03-llm/3.2-attention-mechanism.md).

### Query, Key, and Value
The three vectors attention computes for every token. A token's Query is matched
(via dot product) against every Key to decide how much of each Value to blend in.
See [3.2 The Attention Mechanism](module-03-llm/3.2-attention-mechanism.md).

### Softmax
A function that turns a list of scores into a probability distribution: it
exponentiates each score and divides by the total, so the results are all
positive and sum to 1. Used in attention and next-token prediction. See
[3.2 The Attention Mechanism](module-03-llm/3.2-attention-mechanism.md).

### Multi-Head Attention
Running the attention mechanism many times in parallel ("heads"), each free to
focus on a different kind of relationship (grammar, meaning, tone). See
[3.2 The Attention Mechanism](module-03-llm/3.2-attention-mechanism.md).

### Next-Token Prediction
The fundamental loop of an LLM: given the text so far, predict a probability for
each possible next token, pick one, append it, and repeat. See
[3.4 Next-Token Prediction](module-03-llm/3.4-next-token-prediction.md).

### Logits
The raw, unnormalized scores a model produces for every possible next token,
before softmax turns them into probabilities. See
[3.4 Next-Token Prediction](module-03-llm/3.4-next-token-prediction.md).

### Temperature
A knob that reshapes the probability distribution before sampling: low
temperature makes the model more predictable, high temperature more creative. See
[3.4 Next-Token Prediction](module-03-llm/3.4-next-token-prediction.md).

## Module 4 — The Art and Science of Context

### Prompt
The full block of text sent to a model — system instructions, conversation
history, the user's question, and any referenced material. See
[4.1 Anatomy of a Prompt](module-04-context/4.1-anatomy-of-a-prompt.md).

### System Prompt
The instructions that set a model's role, tone, and rules, placed before the
conversation. See [4.1 Anatomy of a Prompt](module-04-context/4.1-anatomy-of-a-prompt.md).

### Context Window
The maximum number of tokens a model can consider at once. Everything — system
prompt, history, retrieved documents, and the answer — must fit inside it. See
[4.1 Anatomy of a Prompt](module-04-context/4.1-anatomy-of-a-prompt.md) and
[5.1 The Limits of Memory](module-05-rag-tools/5.1-limits-of-memory.md).

### Prompt Pipeline
The behind-the-scenes steps that transform raw inputs into the final formatted
prompt: gathering context, templating, and shaping the output. See
[4.2 The Prompt Pipeline](module-04-context/4.2-prompt-pipeline.md).

## Module 5 — Expanding the AI's Brain (RAG & Tools)

### Hallucination
When a model confidently produces information that is wrong or made up, often
because the answer isn't in its training data. See
[5.1 The Limits of Memory](module-05-rag-tools/5.1-limits-of-memory.md).

### Retrieval-Augmented Generation
"RAG" — embedding documents, finding the most relevant ones for a question (via
dot-product similarity), and injecting them into the prompt so the model answers
from real sources. See [5.2 Retrieval-Augmented Generation](module-05-rag-tools/5.2-rag.md).

### Dynamic Context
The logic that decides *when and what* external information (web search, a
database, an API) to pull into the context window for a given request. See
[5.3 Dynamic Context](module-05-rag-tools/5.3-dynamic-context.md).

### Model Context Protocol
"MCP" — a standard, client–server way for an AI to connect to external tools and
data sources so it can take actions in the real world. See
[5.4 Connecting to the World with MCP](module-05-rag-tools/5.4-mcp.md).

## Module 6 — The Evolution of AI Architectures

### Agent
An AI system that doesn't just answer but *acts* — choosing and calling tools,
observing results, and looping until a task is done. See
[6.4 Agentic AI](module-06-evolution/6.4-agentic-ai.md).

### Chain-of-Thought
Having a model reason step by step before answering, which improves accuracy on
multi-step problems and enables self-correction. See
[6.3 Reasoning & Feedback Loops](module-06-evolution/6.3-reasoning.md).

### Multi-Agent System
Multiple specialized agents that collaborate — decomposing, delegating, and
reviewing each other's work — to solve problems too big for a single agent. See
[6.5 Thinking Models & Multi-Agent Systems](module-06-evolution/6.5-thinking-multi-agent.md).
