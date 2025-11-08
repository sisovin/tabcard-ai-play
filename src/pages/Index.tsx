import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { agents } from "@/types/agent";
import type { Agent } from "@/types/agent";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Brain, 
  Code, 
  Zap, 
  Shield, 
  BarChart,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                  <Badge variant="secondary" className="text-sm px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-2" />
                    9 Free Courses Available Now
                  </Badge>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    Master the Art of Building{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      AI Agents
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                    Learn cutting-edge AI agent development through hands-on courses. 
                    From basics to advanced techniques, start building intelligent systems today.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" onClick={() => scrollToSection("courses")} className="text-lg px-8">
                      Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate("/signup")} className="text-lg px-8">
                      Get Started Free
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="border-y border-border bg-muted/30 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <BookOpen className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl md:text-4xl font-bold">9</div>
                    <div className="text-sm text-muted-foreground">Expert Courses</div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Clock className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl md:text-4xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">Hours Content</div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl md:text-4xl font-bold">10K+</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <TrendingUp className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl md:text-4xl font-bold">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-32">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Why Choose Our Platform?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to become an AI agent expert
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Brain className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Interactive Learning</CardTitle>
                      <CardDescription>
                        Hands-on playground to practice building AI agents in real-time
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Code className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Real-World Projects</CardTitle>
                      <CardDescription>
                        Build production-ready AI agents with practical examples
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Zap className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Fast-Track Learning</CardTitle>
                      <CardDescription>
                        Accelerated curriculum designed to get you building quickly
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Shield className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Expert Guidance</CardTitle>
                      <CardDescription>
                        Learn from industry professionals with years of AI experience
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <BarChart className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Track Progress</CardTitle>
                      <CardDescription>
                        Monitor your learning journey with detailed analytics
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Users className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>Community Support</CardTitle>
                      <CardDescription>
                        Join thousands of learners and share your progress
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="py-20 md:py-32 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Learn How to Build AI Agents
                  </h2>
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
            </section>

            {/* Benefits Section */}
            <section id="about" className="py-20 md:py-32">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold">
                      Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Our comprehensive platform provides all the tools, resources, and support 
                      you need to master AI agent development.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        "Access to all 9 comprehensive courses",
                        "Interactive coding playground",
                        "Real-time progress tracking",
                        "Certificate of completion",
                        "Lifetime access to course materials",
                        "Regular content updates"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <Badge className="w-fit mb-2">Limited Time Offer</Badge>
                      <CardTitle className="text-3xl">Free Forever</CardTitle>
                      <CardDescription className="text-lg">
                        Get full access to all courses and features at no cost
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span>9 Expert Courses</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span>Interactive Playground</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span>Progress Tracking</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span>Community Access</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span>Lifetime Updates</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      
                      <Button className="w-full" size="lg" onClick={() => navigate("/signup")}>
                        Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      
                      <p className="text-sm text-center text-muted-foreground">
                        No credit card required • Instant access
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Final CTA Section */}
            <section id="community" className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Ready to Build Your First AI Agent?
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Join thousands of developers learning to create intelligent systems. 
                    Start your journey today with our free comprehensive courses.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8">
                      Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => scrollToSection("courses")} className="text-lg px-8">
                      Explore Courses
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
