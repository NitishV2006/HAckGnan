import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, BookOpen, Calendar, Play, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Heart,
      title: 'Start Yoga Session',
      description: 'Join live session in 15 mins',
      action: () => navigate('/wellness'),
      variant: 'default' as const,
      badge: 'Live Soon',
      badgeVariant: 'destructive' as const
    },
    {
      icon: ShoppingBag,
      title: 'Shop Recommended',
      description: 'Products for your goals',
      action: () => navigate('/marketplace'),
      variant: 'outline' as const,
      badge: '20% Off',
      badgeVariant: 'secondary' as const
    },
    {
      icon: BookOpen,
      title: 'Learn More',
      description: 'Wellness articles & tips',
      action: () => navigate('/wellness'),
      variant: 'outline' as const
    },
    {
      icon: Calendar,
      title: 'Book Expert Call',
      description: 'Personalized guidance',
      action: () => navigate('/wellness'),
      variant: 'outline' as const,
      badge: 'Popular',
      badgeVariant: 'default' as const
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with others',
      action: () => navigate('/community'),
      variant: 'outline' as const
    },
    {
      icon: Play,
      title: 'Quick Meditation',
      description: '5-min stress relief',
      action: () => console.log('Start meditation'),
      variant: 'outline' as const
    }
  ];

  return (
    <Card className="wellness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-transform"
                onClick={action.action}
              >
                <div className="flex items-center gap-2 w-full">
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium text-sm">{action.title}</span>
                  {action.badge && (
                    <Badge variant={action.badgeVariant} className="text-xs ml-auto">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-left w-full">
                  {action.description}
                </p>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};