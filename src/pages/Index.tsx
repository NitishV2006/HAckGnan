import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { EnhancedOnboarding } from "@/components/EnhancedOnboarding";
import { PersonalizedChallengeView } from "@/components/PersonalizedChallengeView";
import { DashboardHome } from "@/components/DashboardHome";
import { TaskCompletionAnimation } from "@/components/TaskCompletionAnimation";
import { EnhancedWellnessChatbot } from "@/components/EnhancedWellnessChatbot";
import { NotificationSystem } from "@/components/NotificationSystem";
import { GamificationSystem } from "@/components/GamificationSystem";
import { ContentFeed } from "@/components/ContentFeed";
import { WelcomeTour } from "@/components/WelcomeTour";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [personalizedChallenge, setPersonalizedChallenge] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTaskCompletion, setShowTaskCompletion] = useState(false);
  const [completedTaskPoints, setCompletedTaskPoints] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'gamification' | 'content'>('dashboard');

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setUserProfile(profile);
        
        if (!profile.onboarding_completed) {
          setShowOnboarding(true);
        } else if (profile.personalized_challenge) {
          setPersonalizedChallenge(profile.personalized_challenge);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await fetchUserProfile(); // Refresh profile data
  };

  const handleTaskComplete = async (taskId: string, points: number) => {
    setCompletedTaskPoints(points);
    setShowTaskCompletion(true);

    // Update user points
    if (user && userProfile) {
      try {
        await supabase
          .from('profiles')
          .update({ 
            total_points: (userProfile.total_points || 0) + points 
          })
          .eq('user_id', user.id);
        
        // Refresh profile data
        await fetchUserProfile();
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if user hasn't completed it
  if (user && showOnboarding) {
    return <EnhancedOnboarding onComplete={handleOnboardingComplete} />;
  }

  // Show personalized challenge if available
  if (user && personalizedChallenge) {
    return (
      <div className="min-h-screen home-theme pb-24">
        <Header userName={userProfile?.display_name || user?.email || "User"} points={userProfile?.total_points || 0} />
        
        <div className="p-4">
          <PersonalizedChallengeView 
            challenge={personalizedChallenge}
            onTaskComplete={(day, taskIndex) => {
              handleTaskComplete(`day-${day}-task-${taskIndex}`, 20);
            }}
          />
        </div>

        {showTaskCompletion && (
          <TaskCompletionAnimation
            points={completedTaskPoints}
            onComplete={() => setShowTaskCompletion(false)}
          />
        )}

        {/* Enhanced Wellness Chatbot */}
        <EnhancedWellnessChatbot 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)} 
        />

        {/* Notification System */}
        <NotificationSystem 
          isOpen={showNotifications}
          onToggle={() => setShowNotifications(!showNotifications)}
        />

        {/* Welcome Tour */}
        {showWelcomeTour && (
          <WelcomeTour
            isActive={showWelcomeTour}
            onComplete={() => setShowWelcomeTour(false)}
            onSkip={() => setShowWelcomeTour(false)}
          />
        )}

        <Navigation />
      </div>
    );
  }

  // Default view - Enhanced Dashboard (only show if user is authenticated)
  if (!user) {
    return null; // This will redirect to auth via useEffect
  }

  return (
    <div className="min-h-screen home-theme pb-24">
      <Header userName={userProfile?.display_name || user?.email || "User"} points={userProfile?.total_points || 0} />
      
      {/* Hero Section */}
      <div className="p-4 text-center home-theme">
        <div className="text-foreground py-6">
          <h1 className="text-3xl font-bold font-devanagari mb-2 text-[hsl(var(--home-accent))]">
            आरोग्यपथः
          </h1>
          <p className="text-lg font-medium text-[hsl(var(--home-accent))/80]">Path of Health</p>
          <p className="text-sm text-muted-foreground mt-1">Your personalized wellness journey</p>
        </div>
      </div>

      <div className="p-4">
        {activeSection === 'dashboard' && (
          <DashboardHome 
            userProfile={userProfile || { display_name: 'User', total_points: 0, current_streak: 0, current_day: 1 }}
            onTaskComplete={handleTaskComplete}
          />
        )}

        {activeSection === 'gamification' && (
          <GamificationSystem />
        )}

        {activeSection === 'content' && (
          <ContentFeed />
        )}
      </div>

      {/* Task Completion Animation */}
      {showTaskCompletion && (
        <TaskCompletionAnimation
          points={completedTaskPoints}
          onComplete={() => setShowTaskCompletion(false)}
        />
      )}

      {/* Enhanced Wellness Chatbot */}
      <EnhancedWellnessChatbot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />

      <Navigation />
    </div>
  );
};

export default Index;