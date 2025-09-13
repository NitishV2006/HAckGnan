import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock, Star, Play, ExternalLink } from 'lucide-react';

interface Task {
  id: string;
  time: string;
  category: string;
  task: string;
  description?: string;
  points: number;
  completed: boolean;
  icon?: string;
  actionType?: 'recipe' | 'exercise' | 'meditation' | 'reading' | 'default';
  actionLink?: string;
}

interface TimeSlotTasksProps {
  title: string;
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
}

export const TimeSlotTasks = ({ title, tasks, onTaskComplete, timeSlot }: TimeSlotTasksProps) => {
  const categoryColors: Record<string, string> = {
    nutrition: "bg-green-500/10 text-green-700 border-green-200",
    fitness: "bg-blue-500/10 text-blue-700 border-blue-200",
    mental: "bg-purple-500/10 text-purple-700 border-purple-200",
    wellness: "bg-orange-500/10 text-orange-700 border-orange-200",
    eco: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    self_care: "bg-pink-500/10 text-pink-700 border-pink-200",
  };

  const getActionButton = (task: Task) => {
    const actionConfig = {
      recipe: { icon: ExternalLink, text: "View Recipe", variant: "outline" as const },
      exercise: { icon: Play, text: "Start Exercise", variant: "default" as const },
      meditation: { icon: Play, text: "Start Session", variant: "default" as const },
      reading: { icon: ExternalLink, text: "Read More", variant: "outline" as const },
      default: { icon: ExternalLink, text: "Learn More", variant: "ghost" as const }
    };

    const config = actionConfig[task.actionType || 'default'];
    const IconComponent = config.icon;

    return (
      <Button 
        variant={config.variant} 
        size="sm" 
        className="text-xs"
        onClick={(e) => {
          e.stopPropagation();
          // Handle action - could open modal, navigate, etc.
          console.log(`Action: ${task.actionType} for task: ${task.task}`);
        }}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.text}
      </Button>
    );
  };

  const completedInSlot = tasks.filter(t => t.completed).length;
  const slotColors = {
    morning: "border-l-orange-400 bg-gradient-to-r from-orange-50/50 to-transparent",
    afternoon: "border-l-yellow-400 bg-gradient-to-r from-yellow-50/50 to-transparent",
    evening: "border-l-purple-400 bg-gradient-to-r from-purple-50/50 to-transparent",
    night: "border-l-indigo-400 bg-gradient-to-r from-indigo-50/50 to-transparent"
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className={`border-l-4 pl-4 ${slotColors[timeSlot]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {title}
          <Badge variant="secondary" className="text-xs">
            {completedInSlot}/{tasks.length}
          </Badge>
        </h3>
        {completedInSlot === tasks.length && tasks.length > 0 && (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            ✨ Time Slot Complete!
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border transition-all hover:shadow-md ${
              task.completed 
                ? 'bg-primary/5 border-primary/20 opacity-75' 
                : 'bg-card border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="mt-0.5 p-1 h-auto"
                onClick={() => onTaskComplete(task.id)}
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                )}
              </Button>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
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
                
                <div className="space-y-2">
                  <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.icon && <span className="mr-2">{task.icon}</span>}
                    {task.task}
                  </h4>
                  
                  {task.description && !task.completed && (
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                  
                  {!task.completed && (
                    <div className="flex items-center gap-2">
                      {getActionButton(task)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};