import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Tag, Send } from "lucide-react";
import { useState } from "react";
import { useCommunityActions } from "@/hooks/useCommunityActions";
import { useAuth } from "@/hooks/useAuth";

export const CreatePost = () => {
  const { user } = useAuth();
  const { createPost, loading } = useCommunityActions();
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const groups = [
    "Yoga Enthusiasts",
    "Ayurveda Wisdom", 
    "Skin Care Naturally",
    "Mental Health Support",
    "Eco Living"
  ];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    const success = await createPost(content, selectedGroup || undefined, tags.length > 0 ? tags : undefined);
    
    if (success) {
      setContent("");
      setSelectedGroup("");
      setTags([]);
      setIsExpanded(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!user) return null;

  return (
    <Card className="wellness-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-wellness-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-wellness-primary/10 text-wellness-primary font-semibold">
              {user.email?.substring(0, 2).toUpperCase() || 'WS'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            {!isExpanded ? (
              <Button 
                variant="outline" 
                className="w-full justify-start text-muted-foreground border-wellness-primary/20 hover:bg-wellness-primary/5"
                onClick={() => setIsExpanded(true)}
              >
                Share your wellness journey...
              </Button>
            ) : (
              <>
                <Textarea
                  placeholder="Share your wellness journey, tips, or experiences..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[100px] border-wellness-primary/20 focus:border-wellness-primary resize-none"
                />
                
                {/* Group Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Share to group (optional)</label>
                  <div className="flex gap-2 flex-wrap">
                    {groups.map((group) => (
                      <Button
                        key={group}
                        variant={selectedGroup === group ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedGroup(selectedGroup === group ? "" : group)}
                      >
                        {group}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Tags</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1 text-xs px-3 py-1 border border-wellness-primary/20 rounded-lg focus:border-wellness-primary outline-none"
                    />
                    <Button size="sm" variant="outline" onClick={addTag}>
                      <Tag className="h-3 w-3" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          #{tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-wellness-primary/10">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent("");
                        setSelectedGroup("");
                        setTags([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSubmit}
                      disabled={loading || !content.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {!isExpanded && (
            <Button 
              variant="outline" 
              size="icon" 
              className="border-wellness-primary/20 hover:bg-wellness-primary/10"
              onClick={() => setIsExpanded(true)}
            >
              <Plus className="h-4 w-4 text-wellness-primary" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};