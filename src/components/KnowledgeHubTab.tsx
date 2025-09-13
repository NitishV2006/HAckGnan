import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Lightbulb, Clock, Eye, Heart } from "lucide-react";

const dailyInsight = {
  title: "Today's Wellness Insight",
  content: "Drinking warm water with lemon first thing in the morning helps kickstart your metabolism and aids in detoxification. This ancient Ayurvedic practice balances your pH levels and provides vitamin C.",
  expert: "Dr. Priya Sharma",
  category: "Daily Ritual",
  readTime: "2 min read"
};

const quickTips = [
  {
    id: "1",
    title: "5-Minute Breathing Exercise",
    description: "Quick pranayama technique to reduce stress and increase focus",
    type: "Video",
    duration: "5 mins",
    category: "Mind",
    views: 1240,
    likes: 89,
    thumbnail: "🫁"
  },
  {
    id: "2",
    title: "Natural Face Mask Recipe",
    description: "DIY turmeric and honey mask for glowing skin",
    type: "Guide",
    duration: "Read",
    category: "Beauty",
    views: 890,
    likes: 67,
    thumbnail: "🧴"
  },
  {
    id: "3",
    title: "Seasonal Eating Guidelines",
    description: "Ayurvedic principles for eating according to seasons",
    type: "Article",
    duration: "8 min read",
    category: "Nutrition",
    views: 2156,
    likes: 142,
    thumbnail: "🍃"
  }
];

const articles = [
  {
    id: "1",
    title: "The Science Behind Yoga and Mental Health",
    excerpt: "Discover how yoga practice affects brain chemistry and promotes emotional well-being through ancient wisdom backed by modern research.",
    author: "Dr. Sarah Williams",
    readTime: "12 min read",
    category: "Research",
    publishedDate: "2 days ago",
    views: 3420,
    thumbnail: "🧠",
    featured: true
  },
  {
    id: "2",
    title: "Building a Sustainable Morning Routine",
    excerpt: "Simple steps to create a morning routine that energizes your day and aligns with your natural circadian rhythms.",
    author: "Wellness Team",
    readTime: "6 min read",
    category: "Lifestyle",
    publishedDate: "4 days ago",
    views: 1890,
    thumbnail: "🌅",
    featured: false
  },
  {
    id: "3",
    title: "Ayurvedic Approach to Digestive Health",
    excerpt: "Understanding your digestive fire (Agni) and how to optimize digestion through food combining and eating practices.",
    author: "Chef Rajesh Kumar",
    readTime: "15 min read",
    category: "Ayurveda",
    publishedDate: "1 week ago",
    views: 2567,
    thumbnail: "🔥",
    featured: false
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Mind': return '🧠';
    case 'Beauty': return '✨';
    case 'Nutrition': return '🥗';
    case 'Research': return '🔬';
    case 'Lifestyle': return '🌱';
    case 'Ayurveda': return '🌿';
    default: return '📖';
  }
};

export const KnowledgeHubTab = () => {
  return (
    <div className="space-y-6">
      {/* Daily Insight Banner */}
      <Card className="premium-card bg-gradient-subtle border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 text-foreground">{dailyInsight.title}</h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">{dailyInsight.content}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-primary font-medium">by {dailyInsight.expert}</span>
                <Badge variant="outline" className="premium-badge-outline">
                  {dailyInsight.category}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dailyInsight.readTime}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips Section */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Quick Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickTips.map((tip) => (
            <div key={tip.id} className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-subtle rounded-xl flex items-center justify-center text-2xl">
                {tip.thumbnail}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium mb-1 text-foreground">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{tip.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="premium-badge-outline">
                    {getCategoryIcon(tip.category)} {tip.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {tip.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {tip.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {tip.likes}
                  </span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="premium-button">
                {tip.type === 'Video' ? <Play className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Articles Section */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Featured Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className={`p-4 rounded-xl border transition-shadow hover:shadow-md ${
              article.featured ? 'bg-gradient-subtle border-primary/20' : ''
            }`}>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-2xl">
                  {article.thumbnail}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{article.title}</h4>
                      {article.featured && (
                        <Badge variant="default" className="premium-badge mb-2">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium">by {article.author}</span>
                      <Badge variant="outline" className="premium-badge-outline">
                        {getCategoryIcon(article.category)} {article.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </span>
                      <span>{article.publishedDate}</span>
                    </div>
                    
                    <Button size="sm" variant="outline" className="premium-button">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};