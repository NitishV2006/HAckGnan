import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, Target, Sparkles } from "lucide-react";

interface WeeklyChallengeProps {
  challenge: {
    title: string;
    description: string;
    participants: number;
    daysLeft: number;
    reward: number;
    progress: number;
  };
}

export const WeeklyChallenge = ({ challenge }: WeeklyChallengeProps) => {
  return (
    <Card className="wellness-card border-wellness-primary/20 bg-gradient-to-r from-wellness-primary/5 to-wellness-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-wellness-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-wellness-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-wellness-primary">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-wellness-accent/10 text-wellness-accent border-wellness-accent/20">
            {challenge.daysLeft} days left
          </Badge>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {challenge.participants.toLocaleString()} joined
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-wellness-accent" />
              {challenge.reward} points
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Community Progress</span>
            <span className="font-medium">{challenge.progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-wellness-gradient transition-all duration-500" 
              style={{ width: `${challenge.progress}%` }}
            />
          </div>
        </div>
        
        <Button className="w-full bg-wellness-primary hover:bg-wellness-primary/90">
          <Sparkles className="h-4 w-4 mr-2" />
          Join Challenge
        </Button>
      </CardContent>
    </Card>
  );
};