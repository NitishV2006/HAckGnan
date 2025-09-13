import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  ShoppingBag, 
  Users, 
  User, 
  MessageCircle,
  Sparkles,
  Target,
  Award,
  Heart
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlight?: boolean;
  action?: {
    label: string;
    callback: () => void;
  };
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Sarvagnan! 🌿',
    description: 'Your personalized organic living companion. Let me show you around this beautiful wellness ecosystem.',
    icon: '🙏',
    target: 'welcome',
    position: 'center'
  },
  {
    id: 'home',
    title: 'आरोग्यपथः - Path of Health',
    description: 'Your wellness dashboard with daily tasks, progress tracking, and personalized challenges. This is your starting point each day.',
    icon: '🏠',
    target: 'home-section',
    position: 'top',
    highlight: true
  },
  {
    id: 'chatbot',
    title: 'AI Wellness Guide',
    description: 'Your personal Sarvagnan AI assistant with memory! Ask questions, get guidance, and receive voice responses.',
    icon: '🤖',
    target: 'chatbot-button',
    position: 'left',
    action: {
      label: 'Try it now',
      callback: () => console.log('Open chatbot')
    }
  },
  {
    id: 'marketplace',
    title: 'आरोग्यसम्पदः - Wellness Marketplace',
    description: 'Curated organic products, eco-friendly items, and sustainable living essentials from verified brands.',
    icon: '🛍️',
    target: 'marketplace-nav',
    position: 'top'
  },
  {
    id: 'community',
    title: 'सहचर्यम् - Community Togetherness',
    description: 'Connect with like-minded wellness seekers, join challenges, share experiences, and grow together.',
    icon: '👥',
    target: 'community-nav',
    position: 'top'
  },
  {
    id: 'gamification',
    title: 'Earn Rewards & Badges',
    description: 'Complete tasks, maintain streaks, and unlock achievements. Your wellness journey becomes a rewarding adventure!',
    icon: '🏆',
    target: 'points-section',
    position: 'bottom'
  },
  {
    id: 'notifications',
    title: 'Smart Reminders',
    description: 'Gentle wellness reminders, achievement celebrations, and community updates delivered at perfect moments.',
    icon: '🔔',
    target: 'notifications-button',
    position: 'left'
  },
  {
    id: 'complete',
    title: 'Your Wellness Journey Begins! ✨',
    description: 'You\'re all set! Start with your daily tasks, explore the marketplace, join our community, and chat with your AI guide anytime.',
    icon: '🌟',
    target: 'complete',
    position: 'center'
  }
];

interface WelcomeTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const WelcomeTour = ({ isActive, onComplete, onSkip }: WelcomeTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      // Add tour overlay class to body
      document.body.classList.add('tour-active');
    } else {
      setIsVisible(false);
      document.body.classList.remove('tour-active');
    }

    return () => {
      document.body.classList.remove('tour-active');
    };
  }, [isActive]);

  const currentStepData = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  if (!isActive || !isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-opacity duration-300">
        {/* Highlight circle for targeted elements */}
        {currentStepData.highlight && (
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Tour Card */}
      <div className={`fixed z-[10000] transition-all duration-300 ${
        currentStepData.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
        currentStepData.position === 'top' ? 'top-20 left-1/2 transform -translate-x-1/2' :
        currentStepData.position === 'bottom' ? 'bottom-32 left-1/2 transform -translate-x-1/2' :
        currentStepData.position === 'left' ? 'top-1/2 right-6 transform -translate-y-1/2' :
        'top-1/2 left-6 transform -translate-y-1/2'
      }`}>
        <Card className="w-80 max-w-[90vw] shadow-2xl border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currentStepData.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-primary">{currentStepData.title}</h3>
                  <Badge variant="outline" className="text-xs mt-1">
                    Step {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Getting Started</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Action Button */}
            {currentStepData.action && (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={currentStepData.action.callback}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {currentStepData.action.label}
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' :
                      index < currentStep ? 'bg-primary/50' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {currentStep < tourSteps.length - 1 ? (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleComplete}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Heart className="h-4 w-4" />
                  Start Journey
                </Button>
              )}
            </div>

            {/* Skip option */}
            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkip}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Skip tour and explore freely
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </>
  );
};