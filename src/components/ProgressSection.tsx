import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Star, TrendingUp, Award } from 'lucide-react';

interface ProgressSectionProps {
  completedTasks: number;
  totalTasks: number;
  currentStreak: number;
  pointsEarned: number;
  progressPercentage: number;
}

export const ProgressSection = ({
  completedTasks,
  totalTasks,
  currentStreak,
  pointsEarned,
  progressPercentage
}: ProgressSectionProps) => {
  const getStreakBonus = () => {
    if (currentStreak >= 7) return 50;
    if (currentStreak >= 5) return 20;
    if (currentStreak >= 3) return 10;
    return 0;
  };

  const getMotivationalMessage = () => {
    if (progressPercentage === 100) return "🎉 Perfect day! You're unstoppable!";
    if (progressPercentage >= 80) return "🌟 Almost there! Finish strong!";
    if (progressPercentage >= 50) return "💪 Great progress! Keep it up!";
    if (progressPercentage >= 25) return "🚀 You're building momentum!";
    return "✨ Every journey starts with a single step!";
  };

  const streakBonus = getStreakBonus();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Daily Progress */}
      <Card className="wellness-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tasks Completed</span>
              <span className="font-medium text-primary">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-center text-muted-foreground italic">
              {getMotivationalMessage()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Points & Streak */}
      <Card className="wellness-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Rewards & Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs text-muted-foreground">Points Today</span>
                </div>
                <div className="font-bold text-yellow-500 text-lg">{pointsEarned}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Streak</span>
                </div>
                <div className="font-bold text-orange-500 text-lg">{currentStreak}</div>
              </div>
            </div>
            
            {currentStreak >= 3 && (
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
                  🔥 {currentStreak}-Day Streak! +{streakBonus} bonus points
                </Badge>
              </div>
            )}

            {progressPercentage === 100 && (
              <div className="text-center animate-bounce">
                <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                  ⭐ Perfect Day Bonus! +25 points
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};