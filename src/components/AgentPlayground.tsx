import { useState, useEffect } from "react";
import { Agent } from "@/types/agent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, X, BookOpen, MessageSquare, Cpu, Download, Video, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AgentPlaygroundProps {
  agent: Agent;
  onClose: () => void;
  userId?: string;
}

export const AgentPlayground = ({ agent, onClose, userId }: AgentPlaygroundProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      loadProgress();
    }
  }, [userId, agent.id]);

  const loadProgress = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("agent_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("agent_id", agent.id)
      .maybeSingle();

    if (!error && data) {
      setProgress(data.progress_percentage);
      setCompleted(data.completed);
    }
  };

  const updateProgress = async (newProgress: number) => {
    if (!userId) return;

    const { error } = await supabase.from("agent_progress").upsert({
      user_id: userId,
      agent_id: agent.id,
      progress_percentage: newProgress,
      completed: newProgress === 100,
      last_accessed: new Date().toISOString(),
    });

    if (!error) {
      setProgress(newProgress);
      if (newProgress === 100) {
        setCompleted(true);
        toast({
          title: "Course Completed! 🎉",
          description: `Congratulations! You've completed ${agent.title}`,
        });
      }
    }
  };

  const handleMarkComplete = () => {
    updateProgress(100);
  };

  const downloadCode = () => {
    if (!agent.codeExample) return;
    
    const blob = new Blob([agent.codeExample], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agent.title.replace(/\s+/g, "_")}_starter_code.py`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Code Downloaded!",
      description: "Starter code has been downloaded successfully.",
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Ollama API call
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: agent.model,
          prompt: `${agent.ollamaPrompt}\n\nUser: ${userMessage}\n\nAssistant:`,
          stream: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to Ollama");

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Make sure Ollama is running locally on port 11434. Run: ollama serve",
        variant: "destructive",
      });
      console.error("Ollama error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border-2">
        <CardHeader className="border-b pb-4" style={{ backgroundColor: agent.color }}>
          <div className="flex items-start justify-between">
            <div className="flex-1 text-white">
              <CardTitle className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Badge className="h-10 w-10 rounded-full flex items-center justify-center text-lg bg-white/20 text-white">
                  {agent.id}
                </Badge>
                {agent.title}
              </CardTitle>
              <CardDescription className="text-white/90 font-medium">
                {agent.provider} • {agent.instructor}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {userId && (
            <div className="space-y-2 pb-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Progress</h3>
                {completed && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
                {!completed && (
                  <Button size="sm" variant="outline" onClick={handleMarkComplete}>
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          )}

          <Tabs defaultValue="learn" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Course Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
              </div>

              {agent.videoUrl && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Video Tutorial</h3>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={agent.videoUrl}
                      title={`${agent.title} Tutorial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              {agent.codeExample ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Starter Code</h3>
                    <Button size="sm" variant="outline" onClick={downloadCode}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{agent.codeExample}</code>
                  </pre>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Code examples coming soon!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Try It with Ollama</h3>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  {agent.model}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-2">Ask this AI agent anything about {agent.title.toLowerCase()}</p>
                    <p className="text-xs">Powered by Ollama (Local LLM)</p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground ml-8"
                          : "bg-muted mr-8"
                      }`}
                    >
                      <p className="text-sm font-semibold mb-1">
                        {msg.role === "user" ? "You" : agent.title}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask about this AI agent type..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[80px]"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !message.trim()}
                  className="px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2 text-center">
                ⚡ Running locally with Ollama • No internet required
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
