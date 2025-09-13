import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface WellnessChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const WellnessChatbot = ({ isOpen, onToggle }: WellnessChatbotProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Load conversation history from session storage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem(`wellness-chat-${user?.id}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsed);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    } else {
      // Add welcome message for new users
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "🌿 Namaste! I'm your Sarvagnan AI Wellness Guide. I'm here to help you with your daily 30-day wellness plan, health tips, nutrition advice, and eco-living guidance. How can I support your wellness journey today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user?.id]);

  // Save messages to session storage
  useEffect(() => {
    if (messages.length > 0 && user?.id) {
      sessionStorage.setItem(`wellness-chat-${user.id}`, JSON.stringify(messages));
    }
  }, [messages, user?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-pajUxuSHYxMYF07LWUe3QzutThwfOBYK'
        },
        body: JSON.stringify({
          user_id: user?.email || 'anonymous@wellness.app',
          agent_id: '68c59778920bf8c7597d347c',
          session_id: `68c59778920bf8c7597d347c-${sessionId.current}`,
          message: userMessage.content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from wellness guide');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.response || data.message || 'I apologize, but I couldn\'t process that request. Please try asking about your wellness plan, health tips, or nutrition advice.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "🙏 I apologize, but I'm having trouble connecting right now. Please try again in a moment. In the meantime, feel free to explore your daily wellness tasks!",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Unable to connect to wellness guide. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        className="fixed bottom-32 right-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-full p-4 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all duration-300 z-40 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-32 right-6 w-80 h-96 z-40 home-card-theme border-[hsl(var(--home-accent))/30] shadow-[var(--shadow-premium)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--home-accent))/20]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
          <h3 className="font-medium text-[hsl(var(--home-accent))]">Sarvagnan AI Guide</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggle}
          className="hover:bg-[hsl(var(--home-accent))/10]"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${
                  message.isUser
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground ml-auto'
                    : 'bg-gradient-to-r from-[hsl(var(--home-accent))/10] to-background border border-[hsl(var(--home-accent))/20] text-foreground mr-auto'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-[hsl(var(--home-accent))/10] to-background border border-[hsl(var(--home-accent))/20] rounded-2xl px-4 py-3 mr-auto">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[hsl(var(--home-accent))] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[hsl(var(--home-accent))] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[hsl(var(--home-accent))] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-[hsl(var(--home-accent))/20]">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your wellness plan..."
            className="flex-1 rounded-xl border-[hsl(var(--home-accent))/30] focus:border-[hsl(var(--home-accent))/50] bg-background/50"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-xl px-3 hover:shadow-[var(--shadow-soft)] transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};