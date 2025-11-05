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
  model: string;
  videoUrl?: string;
  codeExample?: string;
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
    ollamaPrompt: "You are an AI agent expert specialized in multi-agent systems and memory management. Help users understand how agents can maintain context and work together.",
    model: "llama2",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# Multi-Agent System Example
from crewai import Agent, Task, Crew

# Create agents with memory
researcher = Agent(
    role='Researcher',
    goal='Research and gather information',
    memory=True
)

writer = Agent(
    role='Writer',
    goal='Write compelling content',
    memory=True
)

# Define tasks
research_task = Task(
    description='Research AI trends',
    agent=researcher
)

# Create crew
crew = Crew(agents=[researcher, writer], tasks=[research_task])`
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
    ollamaPrompt: "You are a prompt engineering expert. Guide users on crafting effective prompts and understanding how LLMs interpret instructions.",
    model: "mistral",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# Prompt Engineering Example
import anthropic

client = anthropic.Anthropic(api_key="YOUR_KEY")

# Few-shot prompting
prompt = """
Task: Classify sentiment
Examples:
"I love this!" -> Positive
"Terrible experience" -> Negative

Classify: "This is amazing!"
"""

response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=100,
    messages=[{"role": "user", "content": prompt}]
)`
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
    ollamaPrompt: "You are a LangGraph specialist. Explain how to build graph-based agent workflows and manage complex state transitions.",
    model: "codellama",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# LangGraph State Management
from langgraph.graph import StateGraph
from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    next_agent: str

# Define workflow graph
workflow = StateGraph(AgentState)

def agent_node(state):
    return {"messages": state["messages"] + ["processed"]}

# Add nodes
workflow.add_node("agent", agent_node)
workflow.set_entry_point("agent")

# Compile graph
app = workflow.compile()`
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
    ollamaPrompt: "You are an LLM agent educator. Teach core concepts of how language models can act as intelligent agents.",
    model: "llama2",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# LLM Agent Fundamentals
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

# Define tools
tools = [
    Tool(
        name="Calculator",
        func=lambda x: eval(x),
        description="Useful for math"
    )
]

# Initialize LLM agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools, 
    llm, 
    agent="zero-shot-react-description"
)

# Run agent
result = agent.run("What is 25 * 4?")`
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
    ollamaPrompt: "You are a LangGraph implementation expert. Show users how to build practical AI agents with real-world applications.",
    model: "codellama",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# LangGraph Practical Implementation
from langgraph.prebuilt import ToolExecutor
from langchain.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information"""
    return f"Results for: {query}"

# Create tool executor
tool_executor = ToolExecutor([search_web])

# Define agent logic
def agent_decision(state):
    if state["need_info"]:
        return "search"
    return "respond"

# Build practical workflow
graph.add_conditional_edges("agent", agent_decision)`
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
    ollamaPrompt: "You are a RAG specialist. Explain how to build retrieval-augmented generation systems for grounded AI responses.",
    model: "mistral",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# RAG System with Vector Database
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# Create vector store
texts = ["Document 1 content", "Document 2 content"]
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_texts(texts, embeddings)

# Create RAG chain
llm = OpenAI()
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)

# Query
answer = qa_chain.run("What is in the documents?")`
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
    ollamaPrompt: "You are an AutoGen expert. Guide users through agentic design patterns and multi-agent orchestration.",
    model: "llama2",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# AutoGen Multi-Agent Pattern
import autogen

# Configure LLM
config_list = [{
    "model": "gpt-4",
    "api_key": "YOUR_KEY"
}]

# Create agents
assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list}
)

user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER"
)

# Initiate conversation
user_proxy.initiate_chat(
    assistant,
    message="Write a Python function to sort a list"
)`
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
    ollamaPrompt: "You are an agent memory expert. Explain how AI agents maintain and utilize memory for coherent interactions.",
    model: "neural-chat",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# Agent Memory System
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.llms import OpenAI

# Initialize memory
memory = ConversationBufferMemory()

# Create conversation chain with memory
llm = OpenAI(temperature=0)
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

# Interact with memory
conversation.predict(input="Hi, I'm John")
conversation.predict(input="What's my name?")
# Agent remembers: "Your name is John"`
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
    ollamaPrompt: "You are a LlamaIndex specialist. Show users how to build intelligent RAG systems with agentic behaviors.",
    model: "mistral",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    codeExample: `# LlamaIndex Agentic RAG
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index.agent import OpenAIAgent
from llama_index.tools import QueryEngineTool

# Load documents
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create query engine tool
query_tool = QueryEngineTool.from_defaults(
    query_engine=index.as_query_engine(),
    name="document_search",
    description="Search through documents"
)

# Create agentic RAG
agent = OpenAIAgent.from_tools([query_tool])
response = agent.chat("What are the key insights?")`
  }
];
