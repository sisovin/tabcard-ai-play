export interface Agent {
  id: number;
  title: string;
  provider: string;
  instructor: string;
  duration: string;
  description: string;
  color: string;
  topics: string[];
  ollamaPrompt: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    title: "LLMs as Operating Systems: Agent Memory",
    provider: "DEEPLEARNING AI",
    instructor: "Joao Moura",
    duration: "2 Hours 41 Minutes",
    description: "Learn how to build multi-agent systems with memory capabilities using CrewAI framework.",
    color: "hsl(var(--agent-1))",
    topics: ["Multi-Agent Systems", "Memory Management", "CrewAI", "Agent Orchestration"],
    ollamaPrompt: "You are an AI agent expert specialized in multi-agent systems and memory management. Help users understand how agents can maintain context and work together."
  },
  {
    id: 2,
    title: "Foundations of Prompt Engineering (AWS)",
    provider: "AWS SKILLBUILDER",
    instructor: "Amazon Team",
    duration: "4 Hours",
    description: "Master prompt engineering techniques with AWS best practices and real-world examples.",
    color: "hsl(var(--agent-2))",
    topics: ["Prompt Design", "AWS Services", "Best Practices", "Optimization"],
    ollamaPrompt: "You are a prompt engineering expert. Guide users on crafting effective prompts and understanding how LLMs interpret instructions."
  },
  {
    id: 3,
    title: "Introduction to LangGraph",
    provider: "LANGCHAIN ACADEMY",
    instructor: "Harrison Chase",
    duration: "9 Hours",
    description: "Build stateful, graph-based AI agents with LangGraph for complex workflows.",
    color: "hsl(var(--agent-3))",
    topics: ["LangGraph", "State Management", "Graph Architecture", "Workflows"],
    ollamaPrompt: "You are a LangGraph specialist. Explain how to build graph-based agent workflows and manage complex state transitions."
  },
  {
    id: 4,
    title: "Large Language Model Agents MOOC",
    provider: "AGENTICAI-LEARNING.ORG",
    instructor: "Dawn Song",
    duration: "4 Hours 40 Minutes",
    description: "Comprehensive course on LLM agent fundamentals and advanced capabilities.",
    color: "hsl(var(--agent-4))",
    topics: ["LLM Fundamentals", "Agent Design", "Capabilities", "Limitations"],
    ollamaPrompt: "You are an LLM agent educator. Teach core concepts of how language models can act as intelligent agents."
  },
  {
    id: 5,
    title: "Building AI Agents in LangGraph",
    provider: "DEEPLEARNING AI",
    instructor: "Harrison Chase",
    duration: "1 Hour 32 Minutes",
    description: "Practical guide to implementing AI agents using LangGraph framework.",
    color: "hsl(var(--agent-5))",
    topics: ["LangGraph Implementation", "Practical Examples", "Agent Patterns", "Integration"],
    ollamaPrompt: "You are a LangGraph implementation expert. Show users how to build practical AI agents with real-world applications."
  },
  {
    id: 6,
    title: "Building RAG Agents with LLMs",
    provider: "LEARN NVIDIA",
    instructor: "Nvidia Team",
    duration: "9 Hours",
    description: "Master Retrieval-Augmented Generation (RAG) with NVIDIA's advanced techniques.",
    color: "hsl(var(--agent-6))",
    topics: ["RAG Architecture", "Vector Databases", "Retrieval Systems", "NVIDIA Tools"],
    ollamaPrompt: "You are a RAG specialist. Explain how to build retrieval-augmented generation systems for grounded AI responses."
  },
  {
    id: 7,
    title: "AI Agentic Design Patterns with AutoGen",
    provider: "DEEPLEARNING AI",
    instructor: "Chi Wang",
    duration: "1 Hour 26 Minutes",
    description: "Explore design patterns for building robust multi-agent systems with AutoGen.",
    color: "hsl(var(--agent-7))",
    topics: ["AutoGen Framework", "Design Patterns", "Multi-Agent", "Architecture"],
    ollamaPrompt: "You are an AutoGen expert. Guide users through agentic design patterns and multi-agent orchestration."
  },
  {
    id: 8,
    title: "LLMs as Operating Systems: Agent Memory",
    provider: "DEEPLEARNING AI",
    instructor: "Charles Packer",
    duration: "1 Hour 22 Minutes",
    description: "Deep dive into agent memory systems and how LLMs manage context.",
    color: "hsl(var(--agent-8))",
    topics: ["Memory Systems", "Context Management", "Long-term Memory", "Agent State"],
    ollamaPrompt: "You are an agent memory expert. Explain how AI agents maintain and utilize memory for coherent interactions."
  },
  {
    id: 9,
    title: "Building Agentic RAG with LlamaIndex",
    provider: "DEEPLEARNING AI",
    instructor: "Jerry Liu",
    duration: "44 Minutes",
    description: "Build advanced RAG systems with agentic capabilities using LlamaIndex.",
    color: "hsl(var(--agent-9))",
    topics: ["LlamaIndex", "Agentic RAG", "Query Engines", "Document Processing"],
    ollamaPrompt: "You are a LlamaIndex specialist. Show users how to build intelligent RAG systems with agentic behaviors."
  }
];
