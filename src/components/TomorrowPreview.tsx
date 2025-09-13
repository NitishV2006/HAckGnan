import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Eye, Clock, Star } from 'lucide-react';

// Mock tomorrow's tasks
const tomorrowTasks = [
  {
    id: 'tomorrow-1',
    time: '06:30',
    category: 'nutrition',
    task: 'Green smoothie with spinach and banana',
    points: 15,
    timeSlot: 'morning'
  },
  {
    id: 'tomorrow-2',
    time: '07:00',
    category: 'fitness',
    task: '15-minute morning yoga flow',
    points: 20,
    timeSlot: 'morning'
  },
  {
    id: 'tomorrow-3',
    time: '12:30',
    category: 'wellness',
    task: 'Mindful eating practice during lunch',
    points: 10,
    timeSlot: 'afternoon'
  },
  {
    id: 'tomorrow-4',
    time: '18:00',
    category: 'fitness',
    task: '30-minute nature walk',
    points: 25,
    timeSlot: 'evening'
  },
  {
    id: 'tomorrow-5',
    time: '21:00',
    category: 'mental',
    task: 'Gratitude journaling (3 things)',
    points: 15,
    timeSlot: 'night'
  },
  {
    id: 'tomorrow-6',
    time: '21:30',
    category: 'self_care',
    task: 'Herbal tea and digital detox',
    points: 10,
    timeSlot: 'night'
  }
];

export const TomorrowPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryColors: Record<string, string> = {
    nutrition: "bg-green-500/10 text-green-700 border-green-200",
    fitness: "bg-blue-500/10 text-blue-700 border-blue-200",
    mental: "bg-purple-500/10 text-purple-700 border-purple-200",
    wellness: "bg-orange-500/10 text-orange-700 border-orange-200",
    self_care: "bg-pink-500/10 text-pink-700 border-pink-200",
  };

  const timeSlotIcons = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌇',
    night: '🌙'
  };

  const totalPoints = tomorrowTasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <Card className="wellness-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                👀 Sneak Peek: Tomorrow's Plan
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {totalPoints} points available
                </Badge>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Get mentally prepared for tomorrow's wellness journey ✨
              </p>
              
              {Object.entries(
                tomorrowTasks.reduce((acc, task) => {
                  if (!acc[task.timeSlot]) acc[task.timeSlot] = [];
                  acc[task.timeSlot].push(task);
                  return acc;
                }, {} as Record<string, typeof tomorrowTasks>)
              ).map(([timeSlot, tasks]) => (
                <div key={timeSlot} className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <span>{timeSlotIcons[timeSlot as keyof typeof timeSlotIcons]}</span>
                    <span className="capitalize">{timeSlot}</span>
                    <Badge variant="outline" className="text-xs">
                      {tasks.length} tasks
                    </Badge>
                  </h4>
                  
                  <div className="space-y-2 ml-6">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-muted"
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.time}</span>
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[task.category] || 'bg-muted'}`}
                        >
                          {task.category}
                        </Badge>
                        
                        <span className="text-sm flex-1">{task.task}</span>
                        
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-semibold text-primary">
                            {task.points}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-primary font-medium">
                  🎯 Tomorrow's Goal: Complete all tasks to earn {totalPoints} points!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Each day brings new challenges to keep your journey exciting
                </p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};