import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle, 
  Circle, 
  Star, 
  Award, 
  TrendingUp,
  RefreshCw,
  Info
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Task {
  time: string;
  category: string;
  task: string;
  points: number;
  reason: string;
  completed?: boolean;
}

interface DayChallenge {
  day: number;
  date: string;
  tasks: Task[];
  totalPoints: number;
}

interface PersonalizedChallenge {
  challenges: DayChallenge[];
  totalDays: number;
  estimatedPoints: number;
  focus_areas: string[];
}

interface PersonalizedChallengeViewProps {
  challenge: PersonalizedChallenge;
  onTaskComplete?: (day: number, taskIndex: number) => void;
}

export const PersonalizedChallengeView = ({ 
  challenge, 
  onTaskComplete 
}: PersonalizedChallengeViewProps) => {
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [currentDay, setCurrentDay] = useState(1);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // Add null checks for challenge and challenges array
  if (!challenge || !challenge.challenges || !Array.isArray(challenge.challenges)) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No challenge data available</p>
        </CardContent>
      </Card>
    );
  }

  const todaysChallenge = challenge.challenges.find(c => c.day === currentDay);
  const totalCompletedTasks = Object.keys(completedTasks).filter(key => completedTasks[key]).length;
  const totalTasks = challenge.challenges.reduce((sum, day) => sum + day.tasks.length, 0);
  const completionPercentage = (totalCompletedTasks / totalTasks) * 100;

  const categoryColors: Record<string, string> = {
    morning: "bg-orange-500/10 text-orange-700 border-orange-200",
    mental: "bg-purple-500/10 text-purple-700 border-purple-200",
    nutrition: "bg-green-500/10 text-green-700 border-green-200",
    fitness: "bg-blue-500/10 text-blue-700 border-blue-200",
    evening: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
    eco: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  };

  const handleTaskComplete = async (taskIndex: number) => {
    if (!user || !todaysChallenge) return;

    const taskId = `day-${currentDay}-task-${taskIndex}`;
    const isCompleted = !completedTasks[taskId];
    
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: isCompleted
    }));

    if (isCompleted) {
      const task = todaysChallenge.tasks[taskIndex];
      
      // Add points to user profile
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_points')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ 
              total_points: (profile.total_points || 0) + task.points 
            })
            .eq('user_id', user.id);
        }

        // Record task completion
        await supabase
          .from('daily_task_completions')
          .insert({
            user_id: user.id,
            task_id: taskId,
            points_earned: task.points,
            date: todaysChallenge.date
          });

        toast({
          title: "Task Completed! 🎉",
          description: `Great job! You earned ${task.points} points.`,
        });

        onTaskComplete?.(currentDay, taskIndex);
      } catch (error) {
        console.error('Error updating task completion:', error);
        toast({
          title: "Error",
          description: "Failed to save progress. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleExplanation = (taskIndex: number) => {
    const key = `day-${currentDay}-task-${taskIndex}`;
    setShowExplanations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const goToNextDay = () => {
    if (currentDay < challenge.totalDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  if (!todaysChallenge) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No challenge data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Challenge Overview */}
      <Card className="wellness-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Your 30-Day Wellness Challenge</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Personalized for your goals and lifestyle
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Day {currentDay} of {challenge.totalDays}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">
                {totalCompletedTasks}/{totalTasks} tasks completed
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            
            <div className="flex flex-wrap gap-2">
              {challenge.focus_areas.map((area, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToPreviousDay}
          disabled={currentDay === 1}
        >
          Previous Day
        </Button>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {new Date(todaysChallenge.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToNextDay}
          disabled={currentDay === challenge.totalDays}
        >
          Next Day
        </Button>
      </div>

      {/* Today's Tasks */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Day {currentDay} Tasks
            <Badge variant="secondary" className="ml-auto">
              {todaysChallenge.totalPoints} points available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysChallenge.tasks.map((task, index) => {
              const taskId = `day-${currentDay}-task-${index}`;
              const isCompleted = completedTasks[taskId];
              const showExplanation = showExplanations[taskId];
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all ${
                    isCompleted 
                      ? 'bg-primary/5 border-primary/20 opacity-75' 
                      : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-0.5 p-1 h-auto"
                      onClick={() => handleTaskComplete(index)}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                      )}
                    </Button>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                          {task.time}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[task.category] || 'bg-muted'}`}
                        >
                          {task.category}
                        </Badge>
                        <div className="flex items-center gap-1 ml-auto">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-semibold text-primary">
                            {task.points}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                        {task.task}
                      </p>
                      
                      {showExplanation && (
                        <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 mt-0.5 text-primary" />
                            <p>{task.reason}</p>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExplanation(index)}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        {showExplanation ? 'Hide' : 'Why this task?'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="wellness-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-500">
                  {Math.round(completionPercentage)}%
                </p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">
                  {totalCompletedTasks}
                </p>
                <p className="text-xs text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-500">
                  {challenge.estimatedPoints}
                </p>
                <p className="text-xs text-muted-foreground">Total Points Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};