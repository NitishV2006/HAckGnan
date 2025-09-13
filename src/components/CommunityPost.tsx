import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  CheckCircle, 
  AlertTriangle, 
  Trophy, 
  Flag 
} from "lucide-react";
import { useCommunityActions } from "@/hooks/useCommunityActions";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  group_name?: string;
  tags?: string[];
  is_verified: boolean;
  badge?: string;
  warning_message?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
}

interface CommunityPostProps {
  post: Post;
}

export const CommunityPost = ({ post }: CommunityPostProps) => {
  const { likePost, sharePost, loading } = useCommunityActions();
  const [localLikes, setLocalLikes] = useState(post.likes_count);
  const [localShares, setLocalShares] = useState(post.shares_count);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {
      const success = await likePost(post.id);
      if (success) {
        setLocalLikes(prev => prev + 1);
        setIsLiked(true);
      }
    }
  };

  const handleShare = async () => {
    const success = await sharePost(post.id);
    if (success) {
      setLocalShares(prev => prev + 1);
    }
  };

  const timeAgo = new Date(post.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="wellness-card hover:shadow-wellness transition-all duration-300">
      <CardContent className="p-5">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-wellness-primary/20">
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback className="bg-wellness-primary/10 text-wellness-primary font-semibold">
                {post.profiles?.display_name?.substring(0, 2) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm">{post.profiles?.display_name || 'Anonymous'}</h3>
                {post.is_verified && (
                  <CheckCircle className="h-4 w-4 text-wellness-primary" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{timeAgo}</span>
                {post.group_name && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs border-wellness-primary/20 text-wellness-primary">
                      {post.group_name}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="hover:bg-red-50">
              <Flag className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Warning for unverified content */}
        {post.warning_message && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-wellness-secondary/10 border border-wellness-secondary/20 rounded-xl">
            <AlertTriangle className="h-4 w-4 text-wellness-secondary" />
            <p className="text-xs text-wellness-secondary font-medium">{post.warning_message}</p>
          </div>
        )}

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed mb-4">{post.content}</p>
          
          {/* Post Image */}
          {post.image_url && (
            <div className="text-5xl mb-4 text-center py-6 bg-gradient-to-br from-wellness-primary/5 to-wellness-secondary/5 rounded-xl border border-wellness-primary/10">
              {post.image_url}
            </div>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-wellness-primary/5 text-wellness-primary border border-wellness-primary/10 hover:bg-wellness-primary/10 transition-colors">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-wellness-primary/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'hover:bg-red-50 hover:text-red-500'}`}
              onClick={handleLike}
              disabled={loading || isLiked}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
              <span className="text-xs font-medium">{localLikes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-wellness-primary/10 hover:text-wellness-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{post.comments_count}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 hover:bg-wellness-secondary/10 hover:text-wellness-secondary transition-colors"
              onClick={handleShare}
              disabled={loading}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs font-medium">{localShares}</span>
            </Button>
          </div>
          
          {post.badge && (
            <Badge variant="outline" className="text-xs text-wellness-primary border-wellness-primary/20 bg-wellness-primary/5">
              <CheckCircle className="h-3 w-3 mr-1" />
              {post.badge}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};