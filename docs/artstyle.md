# The Cyber-Candyland Art Style Guide

> **Visual Design System for "How AI Works: From Math to Multi-Agent Systems"**  
> *A cohesive blend of whimsical board game progression and modern high-tech cyberpunk aesthetics.*

---

## 1. Vision & Core Philosophy

The visual identity of **How AI Works** turns an intimidating, math-heavy topic into an inviting, gamified odyssey: **The AI Architecture Quest**.

Instead of dry academic flowcharts, the curriculum is mapped as a **Cyber-Candyland Board Game**:
- **Pedagogical Gamification:** Students embark on a continuous, winding path of **27 stepping-stone tiles** starting at the foundational launchpad (**Tile 0.1**) and journeying to the mountain summit of the **Autonomous Citadel** (**Tile 7.2**).
- **Physicality & Tangible Metaphors:** Abstract mathematical concepts (arrays, matrices, cosine similarity, self-attention, context windows, vector databases, ReAct loops) are transformed into tactile gameboard landmarks—spires, canyons, groves, roller-coaster loops, and data vaults.
- **Synthwave Neon Aesthetic:** Clean vector geometry, vibrant saturated neon pastels, deep obsidian terrain, and luminous glowing circuit traces create a futuristic yet playful learning environment.

---

## 2. The 8 Thematic Zones

The curriculum journey winds through 8 distinct zones, each with a unique color identity, visual motif, and conceptual grounding:

```
[START: 0.1]
     │
     ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ Zone 0: NumPy Launchpad │ ──▶ │  Zone 1: Vector Plains  │ ──▶ │ Zone 2: Embedding Grove │
│ Electric Cyan (#06b6d4) │     │  Emerald Green (#10b981)│     │ Warm Amber (#f59e0b)    │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                             │
                                                                             ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ Zone 5: RAG & MCP Forge │ ◀── │  Zone 4: Context Canyon │ ◀── │ Zone 3: Attention Spire │
│ Sky Blue (#0ea5e9)      │     │  Hot Pink (#ec4899)     │     │ Neon Violet (#a855f7)   │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
             │
             ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│ Zone 6: Agentic Loops   │ ──▶ │ Zone 7: Autonomous Hub  │ ──▶ [FINISH: 7.2]
│ Solar Yellow (#eab308)  │     │ Ruby Rose (#f43f5e)     │
└─────────────────────────┘     └─────────────────────────┘
```

### Detailed Zone Specifications

| Zone | Module | Primary Color | Accent | Visual Landmarks | Stepping Stones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0. NumPy Launchpad** | Mod 0: Setup | Electric Cyan (`#06b6d4`) | `#22d3ee` | Glowing tensor coordinate grids, array wireframes, Python prompt chevrons `>>` | `0.1` |
| **1. Vector & Matrix Plains** | Mod 1: Math | Emerald Green (`#10b981`) | `#34d399` | 3D coordinate vectors, dot product energy sparks, artificial neuron synapses | `1.1` – `1.5` |
| **2. Token & Embedding Grove** | Mod 2: Text | Warm Amber (`#f59e0b`) | `#fbbf24` | Floating glowing token gems, semantic constellation graphs, cosine similarity arcs | `2.1` – `2.3` |
| **3. Transformer Attention Spire** | Mod 3: LLM | Neon Violet (`#a855f7`) | `#c084fc` | Towering crystalline multi-head spire, radiating rainbow attention beams, Q/K/V prism | `3.1` – `3.5` |
| **4. Prompt & Context Canyon** | Mod 4: Context | Hot Pink (`#ec4899`) | `#f472b6` | Holographic terminal screens, context-window chasm bridges, system prompt scrolls | `4.1` – `4.2` |
| **5. RAG Vault & MCP Forge** | Mod 5: Tools | Sky Blue (`#0ea5e9`) | `#38bdf8` | Vector DB storage silos, hovering tool drones, live API socket connectors | `5.1` – `5.4` |
| **6. Agentic Loop-de-Loop** | Mod 6: Evolution | Solar Yellow (`#eab308`) | `#facc15` | Looping roller coaster tracks, cyclic ReAct feedback arrows, reasoning nexus | `6.1` – `6.5` |
| **7. The Autonomous Citadel** | Mod 7: Capstone | Ruby Rose (`#f43f5e`) | Gold (`#ffd700`) | Grand mountain-top citadel, glowing quantum brain crown, triumphant gateway | `7.1` – `7.2` |

---

## 3. Color Palette & Design Tokens

### Backgrounds & Surfaces
- **Canvas Obsidian:** `#090d16` (deep space / dark bedrock)
- **Terrain Slate:** `#0f172a` (card surfaces, dark glass containers)
- **Glass Overlay:** `rgba(15, 23, 42, 0.88)` with `backdrop-filter: blur(8px)`
- **Border Subtle:** `rgba(255, 255, 255, 0.12)` or `var(--md-default-fg-color--lighter)`

### Neon Color Accents
```css
:root {
  --cy-zone-0: #06b6d4; /* Electric Cyan */
  --cy-zone-1: #10b981; /* Emerald Green */
  --cy-zone-2: #f59e0b; /* Warm Amber */
  --cy-zone-3: #a855f7; /* Neon Violet */
  --cy-zone-4: #ec4899; /* Hot Pink */
  --cy-zone-5: #0ea5e9; /* Sky Turquoise */
  --cy-zone-6: #eab308; /* Solar Yellow */
  --cy-zone-7: #f43f5e; /* Ruby Rose */
  --cy-gold:   #ffd700; /* Finish Gold */
}
```

### Lighting & Glow Filters
- **Stepping Stone Glow:** `drop-shadow(0 0 10px var(--glow-color))`
- **Tile Hover Glow:** `drop-shadow(0 0 16px var(--glow-color))` with `transform: translateY(-3px) scale(1.08)`
- **Atmospheric Bloom:** Soft radial gradients behind spires and landmarks (`opacity: 0.25 - 0.40`).

---

## 4. Typography & On-Map Labeling Rules

1. **Embedded Zone Titles (No Floating Flags):**
   - Zone titles must be **embedded directly into the terrain** of that realm.
   - Typography: Bold, uppercase sans-serif (`font-weight: 800`, `letter-spacing: 0.08em`).
   - Font Size: **18px – 24px** for maximum readability across all screen resolutions.
   - Styling: Semi-transparent backdrop ribbon or high-contrast glow outline ensuring 100% legibility against landscape details.

2. **Stepping Stone Numbering:**
   - Every square tile displays its exact lesson number: `0.1`, `1.1`, `1.2`, ..., `7.2`.
   - Typography: Clean monospace or bold geometric sans (`font-weight: 800`).
   - Contrast: High-contrast dark badge text on bright neon tile surface, or bright neon text on dark glass tile with glowing neon border.

3. **Start & Finish Terminals:**
   - **START (Bottom Left):** Prominently marked with `🏁 START: 0.1` and a launch beacon.
   - **FINISH (Top Right):** Crowned atop the Citadel with `👑 FINISH: 7.2` and golden laurels.

---

## 5. Interactive Behavior

- **Square-by-Square Navigation:** Every stepping stone is an SVG hyperlink (`<a xlink:href="..." href="..." target="_top">`) that directly navigates the browser to that lesson.
- **Interactive Tooltips:** Hovering over any square reveals a native tooltip with the full section title (e.g. `1.4 Matrix-Vector Multiplication: How Neurons Compute`).
- **Smooth Hover Lift:** Tiles elevate smoothly on hover (`transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)`), providing tactile board game feedback.

---

## 6. Lesson & Module Decorator System

To maintain this artistic thread throughout every page on the site, each lesson includes a **Cyber-Candyland Waypoint Banner** at the top of the page.

### Waypoint Banner Component
```html
<div class="candyland-waypoint" data-zone="3">
  <span class="waypoint-tile">Tile 3.2</span>
  <span class="waypoint-zone">🔮 Transformer Attention Spire</span>
  <span class="waypoint-progress">Step 11 of 27 · Inside the Large Language Model</span>
</div>
```

### Styling
- Displayed prominently under the main lesson title (`# X.Y ...`).
- Colored border and badge matching the active zone's palette token.
- Seamlessly integrates with dark/light themes.

---

## 7. Asset Architecture

All art assets reside under `docs/assets/images/`:
- `ai-architecture-map.svg`: The primary interactive functional Candyland architecture map.
- `ai-architecture-candyland-map.webp` / `.jpg` / `.png`: High-resolution base art renders.
- `zones/`: Individual zone emblems and spot art for module landing pages.
