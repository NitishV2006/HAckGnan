import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/InteractiveButton";
import { mockDailyTasks, type MockTask } from "@/data/mockData";
import { CheckCircle, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyScheduleProps {
  tasks: MockTask[];
  onTaskComplete: (taskId: string) => void;
}

const categoryConfig = {
  food: { color: "text-green-600", bg: "bg-green-50", icon: "🍃" },
  body: { color: "text-blue-600", bg: "bg-blue-50", icon: "💪" },
  mind: { color: "text-purple-600", bg: "bg-purple-50", icon: "🧠" },
  eco: { color: "text-emerald-600", bg: "bg-emerald-50", icon: "🌱" }
};

const timeSlots = {
  morning: { title: "Morning", icon: "🌅", time: "6:00 - 12:00" },
  afternoon: { title: "Afternoon", icon: "☀️", time: "12:00 - 18:00" },
  evening: { title: "Evening", icon: "🌆", time: "18:00 - 22:00" },
  night: { title: "Night", icon: "🌙", time: "22:00 - 6:00" }
};

export const DailySchedule = ({ tasks, onTaskComplete }: DailyScheduleProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.timeSlot]) acc[task.timeSlot] = [];
    acc[task.timeSlot].push(task);
    return acc;
  }, {} as Record<string, MockTask[]>);

  return (
    <Card className="home-card-theme animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[hsl(var(--home-accent))]" />
          Daily Wellness Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(timeSlots).map(([slot, config]) => {
          const slotTasks = groupedTasks[slot] || [];
          return (
            <div key={slot} className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{config.icon}</span>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--home-accent))]">{config.title}</h3>
                  <p className="text-xs text-muted-foreground">{config.time}</p>
                </div>
              </div>
              <div className="space-y-2 ml-6">
                {slotTasks.map((task) => {
                  const categoryStyle = categoryConfig[task.category];
                  return (
                    <div
                      key={task.id}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-300",
                        task.completed 
                          ? "bg-primary/5 border-primary/20 task-completed" 
                          : "bg-white border-border hover:shadow-md"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-lg ${categoryStyle.bg} flex-shrink-0`}>
                          <span className="text-lg">{task.icon}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className={cn(
                                "font-medium text-sm",
                                task.completed && "line-through opacity-75"
                              )}>
                                {task.title}
                              </h4>
                              <p className={cn(
                                "text-xs text-muted-foreground mt-1",
                                task.completed && "line-through opacity-50"
                              )}>
                                {task.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${categoryStyle.bg} ${categoryStyle.color} font-medium`}>
                                  {task.category}
                                </span>
                                <span className="text-xs text-primary font-medium">
                                  +{task.points} points
                                </span>
                              </div>
                            </div>
                            
                            {task.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <InteractiveButton
                                size="sm"
                                onClick={() => onTaskComplete(task.id)}
                                className="flex-shrink-0 bg-primary/10 hover:bg-primary text-[hsl(var(--home-accent))] border-[hsl(var(--home-accent))/20]"
                                loadingText="Completing..."
                                successText="Done!"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Mark Done
                              </InteractiveButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};