import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useCartActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to add items to cart", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      // Check if item already in cart
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity
          });

        if (error) throw error;
      }

      toast({ 
        title: "Added to cart! 🛒", 
        description: "Item successfully added to your cart.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to add to cart", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    if (!user) return false;

    setLoading(true);
    try {
      if (quantity <= 0) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', cartItemId)
          .eq('user_id', user.id);

        if (error) throw error;
      }

      return true;
    } catch (error: any) {
      toast({ title: "Failed to update cart", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ 
        title: "Removed from cart", 
        description: "Item removed successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to remove item", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ 
        title: "Cart cleared", 
        description: "All items removed from cart.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Failed to clear cart", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    loading
  };
};