import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface WeeklyBadgesProps {
  badges: Array<{
    name: string;
    icon: string;
    description: string;
    count: number;
  }>;
}

export const WeeklyBadges = ({ badges }: WeeklyBadgesProps) => {
  return (
    <Card className="wellness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-wellness-accent" />
          Weekly Badges Earned
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div key={badge.name} className="text-center p-3 rounded-xl bg-gradient-to-br from-wellness-primary/5 to-wellness-secondary/5 border border-wellness-primary/10">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <h4 className="font-semibold text-xs mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              <Badge variant="outline" className="text-xs">
                {badge.count} earned
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};