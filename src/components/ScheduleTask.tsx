import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ScheduleTask as ScheduleTaskType } from "@/hooks/useDynamicSchedule";

interface ScheduleTaskProps extends ScheduleTaskType {
  onComplete: (taskId: string, points: number) => void;
}

const categoryConfig = {
  food: { 
    color: "text-emerald-700", 
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100", 
    border: "border-emerald-200/50",
    icon: "p-2 rounded-xl bg-gradient-to-br from-emerald-100/80 to-emerald-50"
  },
  body: { 
    color: "text-blue-700", 
    bg: "bg-gradient-to-br from-blue-50 to-blue-100", 
    border: "border-blue-200/50",
    icon: "p-2 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-50"
  },
  mind: { 
    color: "text-purple-700", 
    bg: "bg-gradient-to-br from-purple-50 to-purple-100", 
    border: "border-purple-200/50",
    icon: "p-2 rounded-xl bg-gradient-to-br from-purple-100/80 to-purple-50"
  },
  eco: { 
    color: "text-green-700", 
    bg: "bg-gradient-to-br from-green-50 to-green-100", 
    border: "border-green-200/50",
    icon: "p-2 rounded-xl bg-gradient-to-br from-green-100/80 to-green-50"
  },
};

export const ScheduleTask = ({
  id,
  title,
  description,
  category,
  points,
  completed,
  icon,
  onComplete,
}: ScheduleTaskProps) => {
  const config = categoryConfig[category];

  return (
    <div className={cn(
      "premium-card p-5 border transition-[var(--transition-smooth)]",
      config.border,
      completed && "opacity-70 bg-muted/20 border-muted/40"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={config.icon}>
              <span className="text-2xl">{icon}</span>
            </div>
            <div className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide",
              config.bg,
              config.color
            )}>
              {category.toUpperCase()}
            </div>
            <div className="points-badge text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              +{points}
            </div>
          </div>
          
          <h3 className={cn(
            "font-semibold text-lg mb-2 leading-tight",
            completed && "line-through text-muted-foreground"
          )}>
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComplete(id, points)}
          disabled={completed}
          className={cn(
            "ml-4 transition-[var(--transition-smooth)] h-12 w-12 rounded-2xl calm-hover",
            completed && "text-primary bg-primary/5"
          )}
        >
          {completed ? (
            <CheckCircle2 className="h-7 w-7 text-primary achievement-glow" />
          ) : (
            <Circle className="h-7 w-7 hover:text-primary hover:scale-110 transition-[var(--transition-smooth)]" />
          )}
        </Button>
      </div>
    </div>
  );
};