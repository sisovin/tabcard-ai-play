import { useState } from "react";
import { agents } from "@/types/agent";
import { CourseCard } from "@/components/CourseCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { Button } from "@/components/ui/button";
import { BookOpen, Bot, Zap } from "lucide-react";
import type { Agent } from "@/types/agent";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <header className="bg-[hsl(var(--header-bg))] text-black py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-black/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Learn How to Build AI Agent
            <br />
            Start With These 9 Free Courses
          </h1>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-5 w-5" />
              <span>9 Agent Types</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="h-5 w-5" />
              <span>Ollama Powered</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-5 w-5" />
              <span>Interactive Learning</span>
            </div>
          </div>
        </div>
      </header>

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent) => (
            <CourseCard
              key={agent.id}
              agent={agent}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-lg border-2 border-border p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Install Ollama</h3>
              <p className="text-sm text-muted-foreground">
                Download and run Ollama locally for offline AI capabilities
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">
                  Get Ollama
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Choose Your Agent</h3>
              <p className="text-sm text-muted-foreground">
                Click any course card above to explore that agent type
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold">Test & Learn</h3>
              <p className="text-sm text-muted-foreground">
                Interact with AI agents in the playground and learn by doing
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="bg-[hsl(var(--header-bg))] text-black py-6 px-4 sm:px-6 lg:px-8 border-t-4 border-black/10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-bold">
            Want to Learn AI for FREE? Visit: <span className="underline">aiplanetx.com</span>
          </p>
        </div>
      </footer>

      {/* Playground Modal */}
      {selectedAgent && (
        <AgentPlayground
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};

export default Index;
