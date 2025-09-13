import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Check, Heart, Star, Gift, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'social' | 'system';
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
  actionText?: string;
  onAction?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Morning Meditation Time',
    message: 'Start your day with 10 minutes of mindfulness 🧘‍♀️',
    icon: '🧘‍♀️',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    actionable: true,
    actionText: 'Start Now'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Streak Milestone!',
    message: 'You\'ve maintained a 7-day wellness streak! 🎉',
    icon: '🏆',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    type: 'social',
    title: 'Community Update',
    message: 'Sarah completed the same challenge as you! Connect and share tips.',
    icon: '👥',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    actionable: true,
    actionText: 'View Profile'
  }
];

interface NotificationSystemProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const NotificationSystem = ({ isOpen, onToggle }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.85) { // 15% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'reminder',
          title: 'Wellness Reminder',
          message: 'Time to drink some water and take a deep breath! 💧',
          icon: '💧',
          timestamp: new Date(),
          read: false,
          actionable: true,
          actionText: 'Mark Done'
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep max 10
        
        toast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 3000
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Bell className="h-4 w-4" />;
      case 'achievement': return <Star className="h-4 w-4" />;
      case 'social': return <Heart className="h-4 w-4" />;
      case 'system': return <Zap className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'achievement': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'social': return 'bg-pink-500/10 text-pink-600 border-pink-200';
      case 'system': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs animate-pulse"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="fixed top-20 right-4 w-80 max-h-96 z-50 shadow-[var(--shadow-premium)] border-primary/20">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </span>
                      
                      <div className="flex gap-1">
                        {notification.actionable && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs h-6 px-2"
                            onClick={() => {
                              notification.onAction?.();
                              markAsRead(notification.id);
                            }}
                          >
                            {notification.actionText}
                          </Button>
                        )}
                        
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={() => setNotifications([])}
            >
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};