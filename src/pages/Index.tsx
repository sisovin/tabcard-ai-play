import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@/components/Auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { agents } from "@/types/agent";
import type { Agent } from "@/types/agent";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!selectedAgent && <Header />}
      
      {selectedAgent ? (
        <AgentPlayground 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)}
          userId={user?.id}
        />
      ) : (
        <>
          <main className="flex-1">
            <div id="courses" className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Learn How to Build AI Agents
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                  Start With These 9 Free Courses
                </p>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.email}
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
