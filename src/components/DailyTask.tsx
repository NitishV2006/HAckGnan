import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DailyTaskProps {
  id: string;
  title: string;
  description: string;
  category: "food" | "body" | "mind" | "eco";
  points: number;
  completed: boolean;
  onComplete: (id: string) => void;
}

const categoryConfig = {
  food: { color: "text-green-700", bg: "bg-green-50", icon: "🍃" },
  body: { color: "text-blue-700", bg: "bg-blue-50", icon: "🧘" },
  mind: { color: "text-purple-700", bg: "bg-purple-50", icon: "🌸" },
  eco: { color: "text-emerald-700", bg: "bg-emerald-50", icon: "🌱" },
};

export const DailyTask = ({
  id,
  title,
  description,
  category,
  points,
  completed,
  onComplete,
}: DailyTaskProps) => {
  const config = categoryConfig[category];

  return (
    <div className={cn(
      "wellness-card p-4 border-l-4 border-l-primary/30",
      completed && "opacity-75 bg-muted/30"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{config.icon}</span>
            <div className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
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
            "font-semibold mb-1",
            completed && "line-through text-muted-foreground"
          )}>
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComplete(id)}
          className={cn(
            "ml-3 transition-colors",
            completed && "text-primary"
          )}
        >
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary achievement-glow" />
          ) : (
            <Circle className="h-6 w-6 hover:text-primary" />
          )}
        </Button>
      </div>
    </div>
  );
};