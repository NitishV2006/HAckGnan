import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  MessageCircle, 
  X, 
  Mic, 
  Volume2, 
  VolumeX,
  Sparkles,
  ArrowRight,
  Heart,
  Leaf,
  Brain,
  Target
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
  quickActions?: Array<{
    label: string;
    action: string;
    icon: string;
  }>;
}

interface WellnessChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const EnhancedWellnessChatbot = ({ isOpen, onToggle }: WellnessChatbotProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [conversationContext, setConversationContext] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Load conversation history with context
  useEffect(() => {
    const savedData = sessionStorage.getItem(`wellness-chat-${user?.id}`);
    if (savedData) {
      try {
        const { messages: savedMessages, context } = JSON.parse(savedData);
        const parsed = savedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsed);
        setConversationContext(context || {});
      } catch (error) {
        console.error('Error loading chat history:', error);
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, [user?.id]);

  const initializeWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: "🌿 Namaste! I'm your enhanced Sarvagnan AI Wellness Guide. I remember our previous conversations and can provide personalized guidance based on your journey. I can help with your daily wellness plan, answer health questions, and even provide voice responses!",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "How's my wellness progress?",
        "What should I focus on today?",
        "Tell me about my meditation streak"
      ],
      quickActions: [
        { label: "Daily Tasks", action: "/daily-tasks", icon: "✅" },
        { label: "Meditation Guide", action: "/meditation", icon: "🧘‍♀️" },
        { label: "Nutrition Tips", action: "/nutrition", icon: "🥗" },
        { label: "Progress Check", action: "/progress", icon: "📊" }
      ]
    };
    setMessages([welcomeMessage]);
  };

  // Save messages with context
  useEffect(() => {
    if (messages.length > 0 && user?.id) {
      const dataToSave = {
        messages,
        context: conversationContext,
        lastUpdated: new Date()
      };
      sessionStorage.setItem(`wellness-chat-${user.id}`, JSON.stringify(dataToSave));
    }
  }, [messages, conversationContext, user?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const enhancedSendMessage = async (messageText: string = inputValue.trim()) => {
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageText,
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
          message: messageText,
          context: conversationContext // Send conversation context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from wellness guide');
      }

      const data = await response.json();
      
      // Parse response for enhanced features
      let botResponse = data.response || data.message || 'I apologize, but I couldn\'t process that request.';
      let suggestions: string[] = [];
      let quickActions: any[] = [];

      // Extract suggestions and actions from AI response (simple parsing)
      if (botResponse.includes('suggestions:')) {
        const parts = botResponse.split('suggestions:');
        botResponse = parts[0].trim();
        // Parse suggestions from the response if AI provides them
      }

      // Add contextual quick actions based on conversation
      if (messageText.toLowerCase().includes('meditation')) {
        quickActions = [
          { label: "Start Meditation", action: "/meditation", icon: "🧘‍♀️" },
          { label: "Breathing Exercise", action: "/breathing", icon: "🌬️" }
        ];
      } else if (messageText.toLowerCase().includes('nutrition') || messageText.toLowerCase().includes('food')) {
        quickActions = [
          { label: "Meal Plans", action: "/meals", icon: "🥗" },
          { label: "Recipe Ideas", action: "/recipes", icon: "👩‍🍳" }
        ];
      } else if (messageText.toLowerCase().includes('progress') || messageText.toLowerCase().includes('streak')) {
        quickActions = [
          { label: "View Progress", action: "/progress", icon: "📊" },
          { label: "Set Goals", action: "/goals", icon: "🎯" }
        ];
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        isUser: false,
        timestamp: new Date(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        quickActions: quickActions.length > 0 ? quickActions : undefined
      };

      setMessages(prev => [...prev, botMessage]);

      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        lastTopic: messageText.toLowerCase(),
        messageCount: (prev.messageCount || 0) + 1,
        preferredTopics: [...(prev.preferredTopics || []), messageText.toLowerCase()].slice(-5)
      }));

      // Text-to-speech if enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "🙏 I apologize, but I'm having trouble connecting right now. Your conversation history is saved, so please try again in a moment!",
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

  // Voice input (simplified - would need proper implementation)
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "Unable to access microphone. Please type your message.",
          variant: "destructive"
        });
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Voice input is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    enhancedSendMessage(suggestion);
  };

  const handleQuickAction = (action: string, label: string) => {
    // Handle quick actions
    if (action.startsWith('/')) {
      enhancedSendMessage(`I want to access ${label}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enhancedSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        className="fixed bottom-32 right-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-full p-4 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all duration-300 z-40 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        {conversationContext.messageCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white animate-pulse">
            <Sparkles className="w-3 h-3" />
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-32 right-6 w-80 h-[500px] z-40 home-card-theme border-[hsl(var(--home-accent))/30] shadow-[var(--shadow-premium)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--home-accent))/20]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
          <h3 className="font-medium text-[hsl(var(--home-accent))]">Enhanced Sarvagnan AI</h3>
          <Badge className="bg-gradient-to-r from-primary/20 to-primary-glow/20 text-primary text-xs">
            Smart Memory
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="hover:bg-[hsl(var(--home-accent))/10]"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggle}
            className="hover:bg-[hsl(var(--home-accent))/10]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${
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

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full border-[hsl(var(--home-accent))/30] hover:bg-[hsl(var(--home-accent))/10]"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              {message.quickActions && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {message.quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs justify-start border-[hsl(var(--home-accent))/30] hover:bg-[hsl(var(--home-accent))/10]"
                      onClick={() => handleQuickAction(action.action, action.label)}
                    >
                      <span className="mr-2">{action.icon}</span>
                      {action.label}
                      <ArrowRight className="w-3 h-3 ml-auto" />
                    </Button>
                  ))}
                </div>
              )}
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
            placeholder="Ask about your wellness journey..."
            className="flex-1 rounded-xl border-[hsl(var(--home-accent))/30] focus:border-[hsl(var(--home-accent))/50] bg-background/50"
            disabled={isLoading}
          />
          <Button 
            variant="ghost"
            size="icon"
            onClick={startVoiceInput}
            disabled={isLoading || isListening}
            className={`rounded-xl ${isListening ? 'bg-red-500/20 text-red-600' : ''}`}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => enhancedSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-xl px-3 hover:shadow-[var(--shadow-soft)] transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Context indicators */}
        {conversationContext.messageCount > 0 && (
          <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 mr-1" />
            Remembering {conversationContext.messageCount} messages from our conversation
          </div>
        )}
      </div>
    </Card>
  );
};