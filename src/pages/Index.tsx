import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { agents } from "@/types/agent";
import type { Agent } from "@/types/agent";
import { useAuth } from "@/lib/auth-context";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!selectedAgent && <Header />}
      
      {selectedAgent ? (
        <AgentPlayground 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)}
          userId={user?.id || undefined}
        />
      ) : (
        <>
          <main className="flex-1">
            <div id="courses" className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Learn How to Build AI Agents
                </h1>
                <p className="text-xl text-muted-foreground">
                  Start With These 9 Free Courses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <CourseCard
                    key={agent.id}
                    agent={agent}
                    onClick={() => setSelectedAgent(agent)}
                  />
                ))}
              </div>
            </div>
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
