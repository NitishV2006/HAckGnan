import { useEffect, useState } from "react";
import { CheckCircle, Sparkles, Star, Award } from "lucide-react";

interface TaskCompletionAnimationProps {
  onComplete?: () => void;
  points: number;
}

export const TaskCompletionAnimation = ({ onComplete, points }: TaskCompletionAnimationProps) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const isPerfectDay = points >= 25; // Bonus points indicate perfect day

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      onComplete?.();
    }, isPerfectDay ? 3500 : 2500);

    return () => clearTimeout(timer);
  }, [onComplete, isPerfectDay]);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`bg-white dark:bg-card rounded-3xl p-8 shadow-[var(--shadow-premium)] max-w-sm mx-4 text-center animate-scale-in ${isPerfectDay ? 'animate-bounce' : ''}`}>
        <div className="relative mb-6">
          {isPerfectDay ? (
            <Award className="h-20 w-20 text-yellow-500 mx-auto animate-pulse" />
          ) : (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse" />
          )}
          
          {/* Confetti particles */}
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            <Star className="h-4 w-4 text-blue-400 absolute -bottom-1 -left-2 animate-bounce delay-100" />
            <Sparkles className="h-5 w-5 text-pink-400 absolute top-1 -left-3 animate-bounce delay-200" />
            <Star className="h-3 w-3 text-green-400 absolute -top-1 left-4 animate-bounce delay-300" />
            {isPerfectDay && (
              <>
                <Sparkles className="h-4 w-4 text-purple-400 absolute bottom-2 right-2 animate-bounce delay-150" />
                <Star className="h-5 w-5 text-orange-400 absolute -bottom-2 right-4 animate-bounce delay-250" />
              </>
            )}
          </div>
        </div>
        
        <h3 className={`text-xl font-semibold mb-2 ${isPerfectDay ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
          {isPerfectDay ? 'Perfect Day Complete! 🎉' : 'Task Completed! ✨'}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {isPerfectDay 
            ? 'Amazing! You completed all tasks today!' 
            : 'Great job on staying consistent!'
          }
        </p>
        
        <div className={`inline-flex items-center px-6 py-3 rounded-full ${
          isPerfectDay 
            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30' 
            : 'bg-gradient-to-r from-primary/10 to-primary/5'
        }`}>
          <span className={`font-bold text-lg ${
            isPerfectDay ? 'text-yellow-600 dark:text-yellow-400' : 'text-primary'
          }`}>
            +{points} points
          </span>
          {isPerfectDay && (
            <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400">
              (Includes bonus!)
            </span>
          )}
        </div>
        
        {isPerfectDay && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              🔥 Keep up the streak! You're building amazing habits!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};