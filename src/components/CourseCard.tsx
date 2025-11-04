import { Clock, User } from "lucide-react";
import { Agent } from "@/types/agent";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  agent: Agent;
  onClick: () => void;
}

export const CourseCard = ({ agent, onClick }: CourseCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] bg-card border-2 border-border/50 hover:border-primary/50"
      onClick={onClick}
    >
      <div className="absolute top-4 right-4 z-10">
        <Badge 
          className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold bg-primary text-primary-foreground shadow-lg"
        >
          {agent.id}
        </Badge>
      </div>
      
      <div 
        className="h-40 relative flex items-center justify-center text-white font-bold text-xl p-6 transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: agent.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="relative text-center">
          <h3 className="text-sm font-semibold opacity-90 mb-1">{agent.provider}</h3>
          <p className="text-2xl font-bold leading-tight drop-shadow-lg">{agent.title}</p>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {agent.provider}
          </p>
          <h3 className="text-lg font-bold text-primary leading-tight mb-3">
            {agent.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {agent.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{agent.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium">{agent.instructor}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
