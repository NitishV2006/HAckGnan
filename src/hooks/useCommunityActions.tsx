import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useCommunityActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createPost = async (content: string, groupName?: string, tags?: string[], imageUrl?: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to create posts", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content,
          group_name: groupName,
          tags: tags || [],
          image_url: imageUrl,
          is_verified: false
        });

      if (error) throw error;

      toast({ 
        title: "Post created! 📝", 
        description: "Your post has been shared with the community.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to create post", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to like posts", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      // Increment likes count
      const { error } = await supabase.rpc('increment_post_likes', {
        post_id: postId
      });

      if (error) throw error;
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to like post", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to join groups", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('group_memberships')
        .insert({
          user_id: user.id,
          group_id: groupId
        });

      if (error) throw error;

      // Increment group member count
      const { error: countError } = await supabase.rpc('increment_group_members', {
        group_id: groupId
      });

      if (countError) console.warn('Failed to update member count:', countError);

      toast({ 
        title: "Joined group! 🎉", 
        description: "You're now part of this community group.",
      });
      
      return true;
    } catch (error: any) {
      if (error.code === '23505') { // Unique constraint violation
        toast({ title: "Already a member", description: "You're already part of this group.", variant: "destructive" });
      } else {
        toast({ title: "Failed to join group", description: error.message, variant: "destructive" });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const leaveGroup = async (groupId: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('group_memberships')
        .delete()
        .eq('user_id', user.id)
        .eq('group_id', groupId);

      if (error) throw error;

      // Decrement group member count
      const { error: countError } = await supabase.rpc('decrement_group_members', {
        group_id: groupId
      });

      if (countError) console.warn('Failed to update member count:', countError);

      toast({ 
        title: "Left group", 
        description: "You've left this community group.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to leave group", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async (postId: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to share posts", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      // Increment shares count
      const { error } = await supabase.rpc('increment_post_shares', {
        post_id: postId
      });

      if (error) throw error;

      toast({ 
        title: "Post shared! 📤", 
        description: "Post has been shared successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to share post", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPost,
    likePost,
    joinGroup,
    leaveGroup,
    sharePost,
    loading
  };
};