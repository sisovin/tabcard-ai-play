import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { agents } from "@/types/agent";
import type { Agent } from "@/types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProgressData();
    }
  }, [user]);

  const loadProgressData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("agent_progress")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setProgressData(data);
    }
  };

  const getStats = () => {
    const enrolled = progressData.length;
    const completed = progressData.filter((p) => p.completed).length;
    const totalProgress = progressData.reduce((sum, p) => sum + (p.progress_percentage || 0), 0);
    const avgProgress = enrolled > 0 ? Math.round(totalProgress / enrolled) : 0;
    
    return {
      enrolled,
      completed,
      hoursLearned: Math.floor(enrolled * 2.5),
      achievements: completed * 2,
    };
  };

  const stats = getStats();

  const recentActivity = progressData
    .filter((p) => !p.completed && p.progress_percentage > 0)
    .sort((a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!selectedAgent && <Header />}

      {selectedAgent ? (
        <AgentPlayground
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          userId={user.id}
        />
      ) : (
        <>
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]}!
                </h1>
                <p className="text-muted-foreground">
                  Continue your AI learning journey
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.enrolled}</div>
                    <p className="text-xs text-muted-foreground">
                      {agents.length - stats.enrolled} more available
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.hoursLearned}h</div>
                    <p className="text-xs text-muted-foreground">
                      Keep up the great work!
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.completed}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.enrolled - stats.completed} in progress
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.achievements}</div>
                    <p className="text-xs text-muted-foreground">
                      Unlock more by completing courses
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Continue Learning */}
              {recentActivity.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                  <div className="space-y-4">
                    {recentActivity.map((progress) => {
                      const agent = agents.find((a) => a.id === progress.agent_id);
                      if (!agent) return null;

                      return (
                        <Card key={progress.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedAgent(agent)}>
                          <CardContent className="flex items-center gap-4 p-6">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${agent.color} text-white font-bold`}>
                              {agent.id}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{agent.title}</h3>
                              <Progress value={progress.progress_percentage || 0} className="h-2" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {progress.progress_percentage || 0}%
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Courses */}
              <div>
                <h2 className="text-2xl font-bold mb-4">All Courses</h2>
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
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
