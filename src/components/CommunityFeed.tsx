import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Calendar, Loader2 } from "lucide-react";
import { CommunityPost } from "./CommunityPost";
import { useRealtimeCommunityPosts } from "@/hooks/useRealtimeData";

export const CommunityFeed = () => {
  const { posts, loading } = useRealtimeCommunityPosts();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-wellness-primary flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Community Feed
      </h2>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-16 bg-muted rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {posts.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="border-wellness-primary/20 text-wellness-primary hover:bg-wellness-primary/10">
              <Calendar className="h-4 w-4 mr-2" />
              Load More Stories
            </Button>
          </div>
        </>
      )}
    </div>
  );
};