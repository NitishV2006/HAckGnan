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
  Eye,
  Zap,
  Heart,
  ShoppingBag,
  BookOpen,
  Bell,
  PlayCircle,
  Users,
  ChevronRight,
  Flame,
  Gift,
  Timer,
  Sparkles
} from 'lucide-react';
import { TimeSlotTasks } from './TimeSlotTasks';
import { ProgressSection } from './ProgressSection';
import { TomorrowPreview } from './TomorrowPreview';
import { QuickActions } from './QuickActions';
import { TaskCompletionAnimation } from './TaskCompletionAnimation';
import { mockDailyTasks, motivationalQuotes } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface DashboardHomeProps {
  userProfile: any;
  onTaskComplete?: (taskId: string, points: number) => void;
}

export const DashboardHome = ({ userProfile, onTaskComplete }: DashboardHomeProps) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockDailyTasks);
  const [showTaskCompletion, setShowTaskCompletion] = useState(false);
  const [completedTaskPoints, setCompletedTaskPoints] = useState(0);
  const [todayQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [showJourneyOverview, setShowJourneyOverview] = useState(false);

  const currentDay = userProfile?.current_day || 1;
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasksCount / totalTasks) * 100;
  const currentStreak = userProfile?.current_streak || 0;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    if (hour < 20) return 'Evening';
    return 'Night';
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const emoji = {
      'Morning': '🌞',
      'Afternoon': '☀️',
      'Evening': '🌇',
      'Night': '🌙'
    }[timeOfDay];
    
    return `${emoji} Good ${timeOfDay}, ${userProfile?.display_name || 'User'}!`;
  };

  const getSmartReminders = () => {
    const reminders = [];
    const now = new Date();
    const currentHour = now.getHours();
    const incompleteTasks = tasks.filter(t => !t.completed);

    // Morning reminders (8 AM - 12 PM)
    if (currentHour >= 8 && currentHour < 12) {
      const morningTasks = incompleteTasks.filter(t => t.time >= '06:00' && t.time < '12:00');
      if (morningTasks.length > 0) {
        reminders.push({
          icon: '⏰',
          message: `Time to complete your morning tasks!`,
          type: 'morning',
          tasks: morningTasks.length,
          urgency: 'medium'
        });
      }
    }

    // Afternoon reminders (2 PM - 5 PM)
    if (currentHour >= 14 && currentHour < 17) {
      const afternoonTasks = incompleteTasks.filter(t => t.time >= '12:00' && t.time < '17:00');
      if (afternoonTasks.length > 0) {
        reminders.push({
          icon: '☀️',
          message: `Keep up the momentum with your afternoon wellness routine!`,
          type: 'afternoon',
          tasks: afternoonTasks.length,
          urgency: 'low'
        });
      }
    }

    // Evening reminders (6 PM - 10 PM)
    if (currentHour >= 18 && currentHour < 22) {
      const eveningTasks = incompleteTasks.filter(t => t.time >= '17:00' && t.time < '20:00');
      if (eveningTasks.length > 0) {
        reminders.push({
          icon: '🌇',
          message: `Don't forget your evening wellness routine!`,
          type: 'evening',
          tasks: eveningTasks.length,
          urgency: 'high'
        });
      }
    }

    // Night reminders (after 9 PM)
    if (currentHour >= 21) {
      const nightTasks = incompleteTasks.filter(t => t.time >= '20:00' || t.time < '06:00');
      if (nightTasks.length > 0) {
        reminders.push({
          icon: '🌙',
          message: `Wind down with your night routine for better sleep!`,
          type: 'night',
          tasks: nightTasks.length,
          urgency: 'medium'
        });
      }
    }

    return reminders;
  };

  const getAISmartSuggestions = () => {
    const suggestions = [];
    const incompleteTasks = tasks.filter(t => !t.completed);
    const skippedBreakfast = incompleteTasks.some(t => t.task.toLowerCase().includes('lemon water') || t.category === 'nutrition' && t.time < '10:00');
    const missedWorkout = incompleteTasks.some(t => t.category === 'fitness');
    const noMeditation = incompleteTasks.some(t => t.task.toLowerCase().includes('meditation'));

    if (progressPercentage < 25) {
      suggestions.push({
        type: 'encouragement',
        title: '✨ Every journey starts with a single step!',
        message: 'Start with warm lemon water - it\'s simple and sets a healthy tone for your day.',
        action: 'Start Now',
        priority: 'high'
      });
    } else if (progressPercentage >= 25 && progressPercentage < 50) {
      suggestions.push({
        type: 'momentum',
        title: '🚀 You\'re building momentum!',
        message: 'Perfect time for a 5-minute breathing exercise to boost your energy.',
        action: 'Try Breathing Exercise',
        priority: 'medium'
      });
    } else if (progressPercentage >= 50 && progressPercentage < 80) {
      suggestions.push({
        type: 'progress',
        title: '💪 Great progress! Keep it up!',
        message: 'You\'re doing amazing! Stay hydrated and keep moving forward.',
        action: 'Track Water Intake',
        priority: 'low'
      });
    } else if (progressPercentage >= 80 && progressPercentage < 100) {
      suggestions.push({
        type: 'almost_done',
        title: '🌟 Almost there! Finish strong!',
        message: 'Complete your evening routine to earn bonus streak points and feel accomplished!',
        action: 'View Evening Tasks',
        priority: 'high'
      });
    }

    // Specific suggestions based on user behavior
    if (skippedBreakfast) {
      suggestions.push({
        type: 'nutrition',
        title: '🥤 Quick healthy breakfast idea',
        message: 'Try a green smoothie with spinach, banana, and chia seeds for energy.',
        action: 'View Recipe',
        priority: 'medium'
      });
    }

    if (missedWorkout) {
      suggestions.push({
        type: 'fitness',
        title: '🏃‍♀️ Quick movement break',
        message: 'Just 10 minutes of movement can boost your mood and energy significantly.',
        action: 'Start Quick Workout',
        priority: 'medium'
      });
    }

    if (noMeditation && currentStreak > 5) {
      suggestions.push({
        type: 'mental_health',
        title: '🧘‍♀️ Meditation for streak bonus',
        message: 'Keep your streak alive with a short 3-minute mindfulness session.',
        action: 'Start Meditation',
        priority: 'high'
      });
    }

    return suggestions;
  };

  const getDailyMilestones = () => {
    const milestones = [];
    
    if (completedTasksCount >= totalTasks * 0.25) {
      milestones.push({ icon: '🌱', title: 'Quarter Day Champion', unlocked: true });
    }
    
    if (completedTasksCount >= totalTasks * 0.5) {
      milestones.push({ icon: '🌿', title: 'Halfway Hero', unlocked: true });
    }
    
    if (completedTasksCount >= totalTasks * 0.75) {
      milestones.push({ icon: '🌳', title: 'Three-Quarter Tiger', unlocked: true });
    }
    
    if (completedTasksCount === totalTasks) {
      milestones.push({ icon: '🏆', title: 'Perfect Day Master', unlocked: true });
    }
    
    return milestones;
  };

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    );
    
    setTasks(updatedTasks);

    // Check if this completes all tasks for the day
    const allCompleted = updatedTasks.every(t => t.completed);
    
    setCompletedTaskPoints(task.points + (allCompleted ? 25 : 0)); // Bonus for perfect day
    setShowTaskCompletion(true);
    onTaskComplete?.(taskId, task.points + (allCompleted ? 25 : 0));

    // Special celebration for perfect day
    if (allCompleted) {
      setTimeout(() => {
        // Trigger confetti animation
        const confettiElement = document.createElement('div');
        confettiElement.innerHTML = '🎉✨🌟🎊';
        confettiElement.className = 'fixed inset-0 pointer-events-none animate-bounce text-6xl flex items-center justify-center z-50';
        document.body.appendChild(confettiElement);
        
        setTimeout(() => {
          document.body.removeChild(confettiElement);
        }, 3000);
      }, 500);
    }
  };

  // Organize tasks by time slots
  const organizedTasks = {
    morning: tasks.filter(t => t.time >= '06:00' && t.time < '12:00'),
    afternoon: tasks.filter(t => t.time >= '12:00' && t.time < '17:00'),
    evening: tasks.filter(t => t.time >= '17:00' && t.time < '20:00'),
    night: tasks.filter(t => t.time >= '20:00' || t.time < '06:00')
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Motivational & Personalized */}
      <Card className="wellness-card bg-gradient-to-r from-primary/5 via-primary-glow/5 to-secondary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-primary">
              {getGreeting()}
            </h1>
            <div className="space-y-2">
              <p className="text-lg font-medium text-[hsl(var(--wellness-accent))]">
                Day {currentDay} of your Journey – You're doing amazing!
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{Math.round((currentDay / 30) * 100)}% through 30-day plan</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs hover:bg-primary/10 transition-all duration-300 group"
                  onClick={() => setShowJourneyOverview(!showJourneyOverview)}
                >
                  <Eye className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform" />
                  View Journey Overview
                  <ChevronRight className={`h-3 w-3 ml-1 transition-transform ${showJourneyOverview ? 'rotate-90' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Daily Quote */}
            <div className="mt-4 p-4 bg-gradient-to-r from-white/60 to-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm italic text-muted-foreground text-center">
                <Sparkles className="inline h-4 w-4 mr-2 text-primary" />
                "{todayQuote}"
                <Sparkles className="inline h-4 w-4 ml-2 text-primary" />
              </p>
            </div>

            {/* Journey Overview (Expandable) */}
            {showJourneyOverview && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 animate-fade-in">
                <h3 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Your 30-Day Journey Progress
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isCompleted = day < currentDay;
                    const isCurrent = day === currentDay;
                    const isFuture = day > currentDay;
                    
                    return (
                      <div
                        key={day}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                          ${isCompleted ? 'bg-green-500 text-white' : ''}
                          ${isCurrent ? 'bg-primary text-white ring-2 ring-primary ring-offset-2' : ''}
                          ${isFuture ? 'bg-muted text-muted-foreground' : ''}
                        `}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600">
                    <CheckCircle className="inline h-4 w-4 mr-1" />
                    {currentDay - 1} days completed
                  </span>
                  <span className="text-blue-600">
                    <Target className="inline h-4 w-4 mr-1" />
                    {31 - currentDay} days remaining
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Progress Section with Real-time Updates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Progress Card */}
        <Card className="wellness-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Daily Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <Progress value={progressPercentage} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasksCount}/{totalTasks} tasks completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points & Streak Card */}
        <Card className="wellness-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-primary" />
              Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Points Today</span>
                </div>
                <span className="font-bold text-yellow-500">
                  {tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Streak</span>
                </div>
                <span className="font-bold text-orange-500">
                  {currentStreak} days
                </span>
              </div>
              {currentStreak >= 5 && (
                <Badge className="w-full justify-center bg-gradient-to-r from-orange-400 to-red-400 text-white">
                  🔥 {currentStreak}-Day Streak! +{currentStreak >= 7 ? 50 : 20} bonus
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Daily Milestones */}
        <Card className="wellness-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gift className="h-5 w-5 text-primary" />
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getDailyMilestones().map((milestone, index) => (
                <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${
                  milestone.unlocked ? 'bg-green-50 text-green-700' : 'bg-muted/50 text-muted-foreground'
                }`}>
                  <span className="text-lg">{milestone.icon}</span>
                  <span className="text-sm font-medium">{milestone.title}</span>
                  {milestone.unlocked && (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Full-Day Schedule */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's Full-Day Schedule
            <Badge variant="secondary" className="ml-auto">
              {completedTasksCount}/{totalTasks} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <TimeSlotTasks
              title="🌅 Morning"
              tasks={organizedTasks.morning}
              onTaskComplete={handleTaskComplete}
              timeSlot="morning"
            />
            <TimeSlotTasks
              title="☀️ Afternoon"
              tasks={organizedTasks.afternoon}
              onTaskComplete={handleTaskComplete}
              timeSlot="afternoon"
            />
            <TimeSlotTasks
              title="🌇 Evening"
              tasks={organizedTasks.evening}
              onTaskComplete={handleTaskComplete}
              timeSlot="evening"
            />
            <TimeSlotTasks
              title="🌙 Night"
              tasks={organizedTasks.night}
              onTaskComplete={handleTaskComplete}
              timeSlot="night"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tomorrow's Preview */}
      <TomorrowPreview />

      {/* Enhanced Quick Actions with Live Status */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
            <Badge variant="secondary" className="ml-auto">
              Live Updates
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="default"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all bg-gradient-to-r from-primary to-primary/80"
              onClick={() => navigate('/wellness')}
            >
              <div className="flex items-center gap-2 w-full">
                <PlayCircle className="h-5 w-5" />
                <span className="font-medium">Start Yoga Session</span>
                <Badge variant="secondary" className="ml-auto text-xs bg-red-500 text-white animate-pulse">
                  Live in 15m
                </Badge>
              </div>
              <p className="text-xs text-left w-full opacity-90">
                Join the morning flow with 247 others
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all"
              onClick={() => navigate('/marketplace')}
            >
              <div className="flex items-center gap-2 w-full">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-medium text-sm">Shop Recommended</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  20% Off
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                Products curated for your goals
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all"
              onClick={() => navigate('/wellness')}
            >
              <div className="flex items-center gap-2 w-full">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium text-sm">Learn More</span>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                Wellness articles & video guides
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all"
              onClick={() => navigate('/wellness')}
            >
              <div className="flex items-center gap-2 w-full">
                <Timer className="h-4 w-4" />
                <span className="font-medium text-sm">Book Expert Call</span>
                <Badge variant="default" className="ml-auto text-xs">
                  Popular
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                1-on-1 personalized guidance
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all"
              onClick={() => navigate('/community')}
            >
              <div className="flex items-center gap-2 w-full">
                <Users className="h-4 w-4" />
                <span className="font-medium text-sm">Join Community</span>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                Connect with 12,847 members
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-all"
              onClick={() => console.log('Start meditation')}
            >
              <div className="flex items-center gap-2 w-full">
                <Heart className="h-4 w-4" />
                <span className="font-medium text-sm">Quick Meditation</span>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                5-min stress relief session
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Reminders & Notifications */}
      {getSmartReminders().length > 0 && (
        <Card className="wellness-card border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Bell className="h-5 w-5 animate-pulse" />
              Smart Reminders
              <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700">
                {getSmartReminders().length} active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getSmartReminders().map((reminder, index) => (
                <div key={index} className={`p-3 rounded-lg border animate-fade-in ${
                  reminder.urgency === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800' :
                  reminder.urgency === 'medium' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{reminder.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        reminder.urgency === 'high' ? 'text-red-700 dark:text-red-300' :
                        reminder.urgency === 'medium' ? 'text-yellow-700 dark:text-yellow-300' :
                        'text-blue-700 dark:text-blue-300'
                      }`}>
                        {reminder.message}
                      </p>
                      <p className={`text-xs mt-1 ${
                        reminder.urgency === 'high' ? 'text-red-600 dark:text-red-400' :
                        reminder.urgency === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {reminder.tasks} task{reminder.tasks > 1 ? 's' : ''} remaining
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      reminder.urgency === 'high' ? 'border-red-300 text-red-700' :
                      reminder.urgency === 'medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-blue-300 text-blue-700'
                    }`}>
                      {reminder.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced AI Smart Suggestions */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            AI Smart Suggestions
            <Badge variant="secondary" className="ml-auto text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Personalized AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getAISmartSuggestions().map((suggestion, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all hover-scale cursor-pointer ${
                suggestion.priority === 'high' ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-purple-800' :
                suggestion.priority === 'medium' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800' :
                'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    suggestion.priority === 'high' ? 'bg-purple-100 dark:bg-purple-900' :
                    suggestion.priority === 'medium' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-green-100 dark:bg-green-900'
                  }`}>
                    {suggestion.type === 'encouragement' && <Heart className="h-4 w-4 text-purple-500" />}
                    {suggestion.type === 'momentum' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                    {suggestion.type === 'progress' && <Award className="h-4 w-4 text-green-500" />}
                    {suggestion.type === 'almost_done' && <Star className="h-4 w-4 text-yellow-500" />}
                    {suggestion.type === 'nutrition' && <Target className="h-4 w-4 text-orange-500" />}
                    {suggestion.type === 'fitness' && <Zap className="h-4 w-4 text-red-500" />}
                    {suggestion.type === 'mental_health' && <Heart className="h-4 w-4 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      suggestion.priority === 'high' ? 'text-purple-700 dark:text-purple-300' :
                      suggestion.priority === 'medium' ? 'text-blue-700 dark:text-blue-300' :
                      'text-green-700 dark:text-green-300'
                    }`}>
                      {suggestion.title}
                    </p>
                    <p className={`text-xs mt-1 ${
                      suggestion.priority === 'high' ? 'text-purple-600 dark:text-purple-400' :
                      suggestion.priority === 'medium' ? 'text-blue-600 dark:text-blue-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {suggestion.message}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className={`text-xs ${
                    suggestion.priority === 'high' ? 'border-purple-300 text-purple-700 hover:bg-purple-50' :
                    suggestion.priority === 'medium' ? 'border-blue-300 text-blue-700 hover:bg-blue-50' :
                    'border-green-300 text-green-700 hover:bg-green-50'
                  }`}>
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Completion Animation */}
      {showTaskCompletion && (
        <TaskCompletionAnimation
          points={completedTaskPoints}
          onComplete={() => setShowTaskCompletion(false)}
        />
      )}
    </div>
  );
};