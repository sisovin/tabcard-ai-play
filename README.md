# 9 AI Agents Playground Project

Here's a comprehensive playground for 9 AI Agents with Ollama integration! This is a comprehensive AI Agent learning platform with 9 courses. Let me create a modern, interactive playground based on this design with Ollama integration.

---

Table of Contents
- [Project Vision](#project-vision)
- [Planned Features for V1](#planned-features-for-v1)
- [Design Approach](#design-approach)
- [What I'll Build (UI & UX)](#what-ill-build-ui--ux)
- [The 9 AI Agents](#the-9-ai-agents)
- [Quick Start — Using with Ollama (Local LLMs)](#quick-start--using-with-ollama-local-llms)
- [Model Mapping & Configuration](#model-mapping--configuration)
- [Playground Usage](#playground-usage)
- [Developer Setup & Local Development](#developer-setup--local-development)
- [Project Structure (suggested)](#project-structure-suggested)
- [Design System & Theming](#design-system--theming)
- [Roadmap & What's Next](#roadmap--whats-next)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License & Acknowledgements](#license--acknowledgements)

---

## Project Vision

A modern, responsive learning platform where users can:
- Explore 9 different AI Agent types through interactive tab cards
- Learn to build each agent with step-by-step guidance
- Test agents locally using Ollama (no internet required)
- See real-time demonstrations of each agent's capabilities

This project is both a learning site and a developer playground — perfect for engineers, researchers, and learners who want hands-on experience building agentic systems locally.

---

## Planned Features for V1

1. Interactive Tab Navigation — 9 cards representing different AI agents
2. Agent Playground — Live testing interface for each agent
3. Learning Modules — Step-by-step tutorials for building agents
4. Ollama Integration — Local LLM connection (no API keys needed)
5. Code Examples — Reusable snippets for each agent type
6. Responsive Design — Works on mobile, tablet, and desktop

---

## Design Approach

- Colors: Deep tech blues with a vibrant yellow/gold accent
- Style: Modern, clean, subtle gradients, and smooth animations
- Typography: Clear hierarchy for learning content (headings, subheads, code)
- Components: Card-based layout with smooth transitions and badges

Primary palette (suggested)
- Header / Primary Accent: #F4C542 (vibrant yellow/gold)
- Cards Background: #E8F4F8 (soft blue-gray)
- Primary Text: #1E40AF (deep blue)
- Accent Colors: Varied per agent (use distinct hues for easy scanning)

Animations & UX
- Hover elevation on cards
- Smooth tab transitions (fade + slide)
- Streaming response rendering in playground (like a terminal / chat stream)

---

## What I'll Build (UI & UX)

Design Inspiration:
- Bold yellow header banner with high contrast
- 3x3 grid of interactive course cards (responsive)
- Each card with course preview, provider, duration, and instructor
- Light, airy backgrounds with numbered badges
- Clean, professional layout and accessible color contrast

Features:
1. 9 Interactive Course Cards — Numbered badges, provider info, duration, instructor
2. Playground Interface — Click any card to test the agent with Ollama
3. Ollama Integration — Local LLM connection (no API keys)
4. Responsive Grid — Adapts to mobile, tablet, and desktop
5. Learning Resources — Course details and tutorials for each agent

---

## The 9 AI Agents

1. Multi-Agent Systems with Memory (CrewAI)  
2. Prompt Engineering (AWS)  
3. LangGraph Introduction  
4. LLM Agent Fundamentals  
5. Building LangGraph Agents  
6. RAG with NVIDIA  
7. AutoGen Design Patterns  
8. Agent Memory Systems  
9. LlamaIndex Agentic RAG

Each agent card will include:
- Agent name & short description
- Provider / inspiration
- Duration / difficulty
- Instructor or author
- Model badge (which Ollama model is recommended)

---

## Quick Start — Using with Ollama (Local LLMs)

Prerequisites:
- macOS / Linux (or WSL on Windows)
- Node.js (v16+ recommended) and npm / pnpm / yarn
- Ollama (local LLM runner)

Install Ollama
```bash
curl https://ollama.ai/install.sh | sh
```

Pull a model (example)
```bash
ollama pull llama2
```

Serve Ollama locally
```bash
ollama serve
```

Now open the playground in your browser (after starting the dev server — see Developer Setup) and click any course card to test the agent locally. The playground will connect to Ollama at the default endpoint (http://localhost:11434 or as configured).

Notes:
- Ollama runs locally and does not require Internet-based API keys once a model is installed.
- Depending on the model you pull, you may need more disk space and RAM.

---

## Model Mapping & Configuration

This playground will support multiple Ollama models and allow per-agent model suggestions and a runtime model switcher.

Suggested default mapping (examples):
- Multi-Agent Systems — neural-chat
- Prompt Engineering — codellama
- LangGraph Introduction — mistral
- LLM Agent Fundamentals — llama2
- Building LangGraph Agents — codellama
- RAG with NVIDIA — llama2
- AutoGen Design Patterns — neural-chat
- Agent Memory Systems — mistral
- LlamaIndex Agentic RAG — llama2

Example model configuration (JSON)
```json
{
  "agents": [
    { "id": "multi-agent-memory", "name": "Multi-Agent Systems with Memory", "recommendedModel": "neural-chat" },
    { "id": "prompt-engineering", "name": "Prompt Engineering", "recommendedModel": "codellama" }
    // ...
  ],
  "models": ["llama2", "mistral", "codellama", "neural-chat"]
}
```

Model Switcher
- The UI will provide a model selector inside the playground so users can switch models on the fly for experimentation.

Streaming Mode
- Use streaming API (Ollama supports streaming-like behavior) to render token-by-token responses in the chat area for a real-time feel.

---

## Playground Usage

1. Start Ollama and ensure at least one model is available.
2. Run the local dev server (see below).
3. Open the app and browse the 3x3 course grid.
4. Click a course card to open the playground for that agent.
5. Type a prompt or choose a sample prompt and run it.
6. Observe the streamed response and any agent-specific multi-step behavior.

Sample prompts (per-agent examples)
- Multi-Agent Systems: "Design a 3-agent workflow to analyze product feedback and summarize key issues."
- Prompt Engineering: "Rewrite this prompt to be more deterministic and concise."
- RAG: "Retrieve information from the sample docs and produce an answer with source citations."

Save Chat History
- The playground will support local (browser) saving of chat history and downloadable session transcripts (JSON/MD).
- Future: user account-based saves with sync (Lovable Cloud or similar).

---

## Developer Setup & Local Development

Clone
```bash
git clone https://github.com/sisovin/tabcard-ai-play.git
cd tabcard-ai-play
```

Install dependencies
```bash
# using npm
npm install

# or pnpm
pnpm install

# or yarn
yarn
```

Environment
- No remote API keys are required for basic functionality when using Ollama locally. Optionally, provide a REACT_APP_OLLAMA_URL or similar env var to target a non-default Ollama host.

Start dev server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Build for production
```bash
npm run build
```

Run tests (if present)
```bash
npm test
```

Local config example (.env.local)
```env
REACT_APP_OLLAMA_URL=http://localhost:11434
REACT_APP_DEFAULT_MODEL=llama2
```

Note: adapt variable names to your framework (Next.js, Vite, CRA, etc.)

---

## Project Structure (suggested)

- /src
  - /components — UI components (Card, Playground, Header, ModelSwitcher)
  - /pages — routes / views
  - /styles — CSS / Tailwind / tokens
  - /lib — Ollama client, helpers
  - /data — agent metadata and sample prompts
- /public — assets and images
- README.md — this file
- package.json — scripts & deps

---

## Design System & Theming

- Primary: #F4C542 (vibrant yellow/gold)
- Card background: #E8F4F8
- Primary text: #1E40AF
- Accents: A palette per agent for quick identification

Accessibility:
- Large hit targets for cards
- Sufficient contrast (AA / ideally AAA for headings)
- Keyboard navigation for selecting cards & operating the playground

Animations:
- Smooth hover/active states
- Subtle fades for modal/playground open/close

---

## Roadmap & What's Next

- Add More Models: Configure different Ollama models for each agent type
- Save Progress: Add user progress tracking with Lovable Cloud or similar
- Code Examples: Include downloadable starter code & repo templates for each agent
- Video Tutorials: Embed course videos in the playground
- Authentication & Profiles: Save user progress across devices
- Example Notebooks: Provide runnable examples (Colab / local notebooks)
- End-to-end tests and CI

---

## Contributing

Contributions, issues, and feature requests are welcome!
- Fork the repo
- Create a feature branch (feature/your-feature)
- Open a PR against main with a clear description

Please follow standard PR etiquette:
- Build & test locally
- Keep changes scoped
- Include screenshots or gifs for UI changes

---

## Troubleshooting

Ollama not reachable?
- Ensure `ollama serve` is running.
- Verify correct model is pulled: `ollama ls` or `ollama pull <model>`.
- Confirm the URL: default is http://localhost:11434. Set REACT_APP_OLLAMA_URL if needed.

Model errors or out-of-memory?
- Choose a smaller model or ensure your machine meets memory requirements.
- Use swap or a cloud-hosted Ollama instance for heavy models.

Streaming isn't working?
- Ensure the client is using a streaming-compatible endpoint or websocket and the model supports streaming tokens.

---

## What's Included (Summary)

✅ 9 Interactive Course Cards (3x3 grid)  
✅ Ollama Integration — local model testing (no API keys)  
✅ Responsive Design — mobile, tablet, desktop  
✅ Modern UI — yellow header banner, card grid, animations  
✅ Agent Playground — interactive chat interface per agent  
✅ Model Switcher, Streaming Mode, Sample Prompts, Save Chat History (planned / in-progress)

---

## License & Acknowledgements

This project is open-source. Please add an appropriate license (MIT, Apache-2.0, etc.) in a LICENSE file.

Acknowledgements:
- Ollama — for local LLM hosting and easy local model usage
- Design inspiration and course topics from CrewAI, AWS, LangGraph, NVIDIA, LlamaIndex, and AutoGen patterns

---

If you'd like, I can:
- Create starter UI components and a minimal working playground that connects to Ollama
- Scaffold sample agent configurations and sample prompts
- Add a demo configuration for streaming responses and a model switcher
- Produce downloadable starter code for each of the 9 agents

Happy to generate code scaffolding, example components, or a PR with the first UI and Ollama client integration next. Which would you like me to do first?
