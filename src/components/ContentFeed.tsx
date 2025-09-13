import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Heart, 
  Share2, 
  Bookmark, 
  Clock, 
  Eye,
  Leaf,
  Sparkles,
  Brain,
  Utensils,
  Home,
  Users,
  TrendingUp,
  Filter
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'article' | 'tip' | 'recipe' | 'video' | 'guide';
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  category: 'health' | 'nutrition' | 'eco' | 'mindfulness' | 'lifestyle';
  tags: string[];
  readTime: number;
  publishedAt: Date;
  likes: number;
  views: number;
  bookmarked: boolean;
  liked: boolean;
  trending: boolean;
  featured: boolean;
  image?: string;
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'article',
    title: 'The Ancient Art of Oil Pulling: Modern Science Meets Traditional Wisdom',
    excerpt: 'Discover how this 3000-year-old Ayurvedic practice can transform your oral health and boost overall wellness.',
    content: 'Oil pulling, or "kavala" in Sanskrit, is an ancient Ayurvedic detoxification practice...',
    author: {
      name: 'Dr. Priya Nair',
      avatar: '👩‍⚕️',
      role: 'Ayurvedic Practitioner',
      verified: true
    },
    category: 'health',
    tags: ['ayurveda', 'oral-health', 'detox', 'traditional-medicine'],
    readTime: 8,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 234,
    views: 1820,
    bookmarked: false,
    liked: false,
    trending: true,
    featured: true,
    image: '🦷'
  },
  {
    id: '2',
    type: 'recipe',
    title: 'Golden Turmeric Latte: Anti-Inflammatory Powerhouse',
    excerpt: 'A creamy, warming drink packed with turmeric, ginger, and healing spices to support your immune system.',
    content: 'This golden milk recipe combines turmeric with complementary spices...',
    author: {
      name: 'Chef Ananya',
      avatar: '👩‍🍳',
      role: 'Plant-Based Chef',
      verified: true
    },
    category: 'nutrition',
    tags: ['turmeric', 'anti-inflammatory', 'immunity', 'drinks'],
    readTime: 5,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 189,
    views: 1234,
    bookmarked: true,
    liked: true,
    trending: false,
    featured: false,
    image: '🥛'
  },
  {
    id: '3',
    type: 'tip',
    title: '5-Minute Morning Breathing Ritual for Mental Clarity',
    excerpt: 'Simple pranayama techniques to center your mind and energize your body before starting the day.',
    content: 'Start with Nadi Shodhana (alternate nostril breathing)...',
    author: {
      name: 'Ravi Meditation',
      avatar: '🧘‍♂️',
      role: 'Mindfulness Coach',
      verified: false
    },
    category: 'mindfulness',
    tags: ['breathing', 'meditation', 'morning-routine', 'pranayama'],
    readTime: 3,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 156,
    views: 892,
    bookmarked: false,
    liked: false,
    trending: true,
    featured: false,
    image: '🌬️'
  },
  {
    id: '4',
    type: 'guide',
    title: 'Creating a Zero-Waste Kitchen: Complete Beginner\'s Guide',
    excerpt: 'Transform your kitchen into an eco-friendly space with these practical, budget-friendly swaps.',
    content: 'Starting your zero-waste journey can feel overwhelming...',
    author: {
      name: 'Eco Meera',
      avatar: '🌱',
      role: 'Sustainability Expert',
      verified: true
    },
    category: 'eco',
    tags: ['zero-waste', 'sustainable-living', 'kitchen', 'environment'],
    readTime: 12,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 298,
    views: 2145,
    bookmarked: true,
    liked: false,
    trending: false,
    featured: true,
    image: '♻️'
  }
];

export const ContentFeed = () => {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'trending' | 'popular'>('recent');

  const categories = [
    { id: 'all', name: 'All', icon: BookOpen, count: content.length },
    { id: 'health', name: 'Health', icon: Heart, count: content.filter(c => c.category === 'health').length },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils, count: content.filter(c => c.category === 'nutrition').length },
    { id: 'mindfulness', name: 'Mindfulness', icon: Brain, count: content.filter(c => c.category === 'mindfulness').length },
    { id: 'eco', name: 'Eco Living', icon: Leaf, count: content.filter(c => c.category === 'eco').length }
  ];

  const handleLike = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              liked: !item.liked, 
              likes: item.liked ? item.likes - 1 : item.likes + 1 
            }
          : item
      )
    );
  };

  const handleBookmark = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, bookmarked: !item.bookmarked }
          : item
      )
    );
  };

  const filteredContent = content.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ).sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.likes - a.likes;
      case 'popular':
        return b.views - a.views;
      default:
        return b.publishedAt.getTime() - a.publishedAt.getTime();
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'recipe': return <Utensils className="h-4 w-4" />;
      case 'tip': return <Sparkles className="h-4 w-4" />;
      case 'video': return <Eye className="h-4 w-4" />;
      case 'guide': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'recipe': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'tip': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'video': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'guide': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="wellness-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Wellness Content Feed
            <Badge className="ml-auto bg-primary/20 text-primary">
              Daily Fresh Content
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setSelectedCategory(category.id)}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        {[
          { id: 'recent', label: 'Recent', icon: Clock },
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'popular', label: 'Popular', icon: Eye }
        ].map((sort) => (
          <Button
            key={sort.id}
            variant={sortBy === sort.id ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSortBy(sort.id as any)}
          >
            <sort.icon className="h-4 w-4" />
            {sort.label}
          </Button>
        ))}
      </div>

      {/* Content Feed */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <Card 
            key={item.id}
            className={`wellness-card hover:shadow-lg transition-all duration-300 ${
              item.featured ? 'border-primary/30 bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarFallback>{item.author.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{item.author.name}</h4>
                    {item.author.verified && (
                      <Badge className="bg-blue-500/10 text-blue-600 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.author.role}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTimeAgo(item.publishedAt)}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  {item.image && (
                    <div className="text-4xl flex-shrink-0">{item.image}</div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(item.type)}>
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                      {item.trending && (
                        <Badge className="bg-orange-500/10 text-orange-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge className="bg-primary/20 text-primary">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {item.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {item.readTime} min read
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={item.liked ? 'text-red-500' : ''}
                    onClick={() => handleLike(item.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-current' : ''}`} />
                    {item.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className={item.bookmarked ? 'text-primary' : ''}
                    onClick={() => handleBookmark(item.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${item.bookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};