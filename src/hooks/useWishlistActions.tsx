import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useWishlistActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to add to wishlist", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: productId
        });

      if (error) throw error;

      toast({ 
        title: "Added to wishlist! ❤️", 
        description: "Item saved to your wishlist.",
      });
      
      return true;
    } catch (error: any) {
      if (error.code === '23505') { // Unique constraint violation
        toast({ title: "Already in wishlist", description: "This item is already in your wishlist.", variant: "destructive" });
      } else {
        toast({ title: "Failed to add to wishlist", description: error.message, variant: "destructive" });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      toast({ 
        title: "Removed from wishlist", 
        description: "Item removed from your wishlist.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to remove from wishlist", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = async (productId: string) => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      return !!data;
    } catch {
      return false;
    }
  };

  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading
  };
};