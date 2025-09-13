import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ProgressRing } from "@/components/ProgressRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Calendar, 
  Target, 
  Award, 
  TrendingUp, 
  Settings, 
  Crown,
  Flame,
  Leaf,
  Heart,
  Brain,
  Home as HomeIcon
} from "lucide-react";

const achievements = [
  { id: "1", title: "7-Day Streak", icon: "🔥", earned: true, date: "Today" },
  { id: "2", title: "Meditation Master", icon: "🧘‍♀️", earned: true, date: "5 days ago" },
  { id: "3", title: "Organic Champion", icon: "🌿", earned: true, date: "1 week ago" },
  { id: "4", title: "Community Helper", icon: "🤝", earned: false, date: null },
  { id: "5", title: "Wellness Warrior", icon: "⚡", earned: false, date: null },
  { id: "6", title: "Mindful Month", icon: "🌸", earned: false, date: null },
];

const goals = [
  { category: "Fitness", progress: 75, target: "Exercise 5x/week", icon: Heart },
  { category: "Nutrition", progress: 60, target: "100% organic meals", icon: Leaf },
  { category: "Mental Health", progress: 90, target: "Daily meditation", icon: Brain },
  { category: "Eco Living", progress: 45, target: "Zero waste week", icon: HomeIcon },
];

const weeklyStats = [
  { day: "Mon", completed: 3, total: 4 },
  { day: "Tue", completed: 4, total: 4 },
  { day: "Wed", completed: 2, total: 4 },
  { day: "Thu", completed: 4, total: 4 },
  { day: "Fri", completed: 3, total: 4 },
  { day: "Sat", completed: 4, total: 4 },
  { day: "Sun", completed: 1, total: 4 },
];

const Profile = () => {
  const completionRate = 85;
  const totalPoints = 2450;
  const currentStreak = 7;
  const joinDate = "March 2024";

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header userName="Wellness Seeker" points={totalPoints} />
      
      {/* Profile Header */}
      <div className="p-4">
        <Card className="wellness-card text-center">
          <CardContent className="p-6">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                WS
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-xl font-bold mb-1">Wellness Seeker</h1>
            <p className="text-sm text-muted-foreground mb-4">
              स्वलक्ष्यः • Personal Goals
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{totalPoints.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{joinDate}</div>
                <div className="text-xs text-muted-foreground">Member Since</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Crown className="h-4 w-4 mr-1" />
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ProgressRing progress={completionRate} size={120}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {completionRate}%
                </div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </ProgressRing>
            
            <p className="text-sm text-muted-foreground mt-4">
              You're doing amazing! Keep up the great work on your wellness journey.
            </p>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              This Week's Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyStats.map((day) => {
                const percentage = (day.completed / day.total) * 100;
                return (
                  <div key={day.day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">
                      {day.day}
                    </div>
                    <div className="relative h-20 w-6 mx-auto bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-500"
                        style={{ height: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {day.completed}/{day.total}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div key={goal.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{goal.category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {goal.target}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`wellness-card p-3 text-center ${
                    achievement.earned 
                      ? 'border-yellow-200 bg-yellow-50' 
                      : 'opacity-50'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${
                    achievement.earned ? 'achievement-glow' : ''
                  }`}>
                    {achievement.icon}
                  </div>
                  <h3 className="text-xs font-medium mb-1">
                    {achievement.title}
                  </h3>
                  {achievement.earned && (
                    <p className="text-xs text-green-600">
                      {achievement.date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-primary mb-1">7</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-primary mb-1">92%</div>
              <div className="text-xs text-muted-foreground">Organic Score</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;