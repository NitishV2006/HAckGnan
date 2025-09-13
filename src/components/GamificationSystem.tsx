import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Flame,
  Crown,
  Medal,
  Gift,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'wellness' | 'social' | 'consistency' | 'learning';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  tasksCompleted: number;
  challengesCompleted: number;
  communityContributions: number;
  experiencePoints: number;
  nextLevelXP: number;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete morning routine for 7 days',
    icon: '🌅',
    category: 'consistency',
    points: 100,
    rarity: 'common',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    progress: 7,
    maxProgress: 7
  },
  {
    id: '2',
    title: 'Meditation Master',
    description: 'Complete 30 meditation sessions',
    icon: '🧘‍♀️',
    category: 'wellness',
    points: 250,
    rarity: 'rare',
    unlocked: false,
    progress: 18,
    maxProgress: 30
  },
  {
    id: '3',
    title: 'Community Helper',
    description: 'Help 10 community members',
    icon: '🤝',
    category: 'social',
    points: 200,
    rarity: 'rare',
    unlocked: false,
    progress: 6,
    maxProgress: 10
  },
  {
    id: '4',
    title: 'Wellness Warrior',
    description: 'Maintain 30-day wellness streak',
    icon: '⚔️',
    category: 'consistency',
    points: 500,
    rarity: 'epic',
    unlocked: false,
    progress: 12,
    maxProgress: 30
  },
  {
    id: '5',
    title: 'Zen Legend',
    description: 'Complete advanced mindfulness program',
    icon: '👑',
    category: 'learning',
    points: 1000,
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  }
];

const mockUserStats: UserStats = {
  level: 8,
  totalPoints: 1245,
  currentStreak: 12,
  longestStreak: 18,
  tasksCompleted: 156,
  challengesCompleted: 23,
  communityContributions: 45,
  experiencePoints: 1840,
  nextLevelXP: 2000
};

const leaderboard = [
  { rank: 1, name: 'Priya Sharma', points: 2890, avatar: '👩‍🦰', badge: 'legendary' },
  { rank: 2, name: 'Arjun Patel', points: 2456, avatar: '👨‍💼', badge: 'epic' },
  { rank: 3, name: 'Meera Singh', points: 2134, avatar: '👩‍🎨', badge: 'epic' },
  { rank: 4, name: 'You', points: 1245, avatar: '🧘‍♀️', badge: 'rare', isCurrentUser: true },
  { rank: 5, name: 'Rohan Kumar', points: 1098, avatar: '👨‍🏫', badge: 'rare' }
];

export const GamificationSystem = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [activeTab, setActiveTab] = useState<'progress' | 'achievements' | 'leaderboard'>('progress');
  const [showConfetti, setShowConfetti] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/10 text-gray-600 border-gray-200';
      case 'rare': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'epic': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'legendary': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'legendary': return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
      case 'epic': return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      case 'rare': return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const progressToNextLevel = (userStats.experiencePoints / userStats.nextLevelXP) * 100;

  const simulateAchievementUnlock = () => {
    const unlockedAchievement = achievements.find(a => a.id === '2');
    if (unlockedAchievement && !unlockedAchievement.unlocked) {
      setAchievements(prev => 
        prev.map(a => a.id === '2' ? { ...a, unlocked: true, unlockedAt: new Date() } : a)
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                🎉
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level Progress Card */}
      <Card className="wellness-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Level {userStats.level} Wellness Seeker
            </div>
            <Badge className={getBadgeColor('rare')}>
              {userStats.totalPoints} pts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{userStats.experiencePoints}/{userStats.nextLevelXP} XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-lg font-bold">{userStats.currentStreak}</span>
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-lg font-bold">{userStats.tasksCompleted}</span>
              </div>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-lg font-bold">{userStats.communityContributions}</span>
              </div>
              <p className="text-xs text-muted-foreground">Helped Others</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'progress', label: 'Progress', icon: TrendingUp },
          { id: 'achievements', label: 'Badges', icon: Award },
          { id: 'leaderboard', label: 'Ranking', icon: Trophy }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'achievements' && (
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`border-2 transition-all duration-300 hover:shadow-lg ${
                achievement.unlocked 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-muted/30 opacity-70'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                        <Badge variant="secondary">
                          +{achievement.points}
                        </Badge>
                      </div>
                    </div>
                    
                    {achievement.maxProgress && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress! / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-primary mt-2">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={simulateAchievementUnlock}
            className="w-full mt-4"
            variant="outline"
          >
            <Gift className="h-4 w-4 mr-2" />
            Simulate Achievement Unlock
          </Button>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Community Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  user.isCurrentUser 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {user.rank <= 3 ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {user.rank}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {user.rank}
                    </div>
                  )}
                </div>
                
                <div className="text-2xl">{user.avatar}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.name}</span>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{user.points.toLocaleString()} points</span>
                    <Badge className={getBadgeColor(user.badge)}>
                      {user.badge}
                    </Badge>
                  </div>
                </div>
                
                {user.rank <= 3 && (
                  <Medal className="h-5 w-5 text-amber-500" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'progress' && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="wellness-card">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{userStats.currentStreak}</div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xs text-muted-foreground mt-1">Best: {userStats.longestStreak} days</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{userStats.challengesCompleted}</div>
              <p className="text-sm text-muted-foreground">Challenges</p>
              <p className="text-xs text-muted-foreground mt-1">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-amber-500" />
              <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
              <p className="text-sm text-muted-foreground">Badges</p>
              <p className="text-xs text-muted-foreground mt-1">Earned</p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{userStats.communityContributions}</div>
              <p className="text-sm text-muted-foreground">Community</p>
              <p className="text-xs text-muted-foreground mt-1">Contributions</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};