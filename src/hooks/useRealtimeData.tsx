import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

// Real-time hook for workshops
export const useRealtimeWorkshops = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchWorkshops = async () => {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (error) {
        toast({ title: "Error fetching workshops", description: error.message, variant: "destructive" });
      } else {
        setWorkshops(data || []);
      }
      setLoading(false);
    };

    fetchWorkshops();

    // Set up real-time subscription
    const channel = supabase
      .channel('workshops-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'workshops'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setWorkshops(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setWorkshops(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setWorkshops(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { workshops, loading };
};

// Real-time hook for experts
export const useRealtimeExperts = () => {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('is_available', true)
        .order('rating', { ascending: false });
      
      if (error) {
        toast({ title: "Error fetching experts", description: error.message, variant: "destructive" });
      } else {
        setExperts(data || []);
      }
      setLoading(false);
    };

    fetchExperts();

    const channel = supabase
      .channel('experts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'experts'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setExperts(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setExperts(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setExperts(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { experts, loading };
};

// Real-time hook for products
export const useRealtimeProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('stock_quantity', 0)
        .order('is_featured', { ascending: false });
      
      if (error) {
        toast({ title: "Error fetching products", description: error.message, variant: "destructive" });
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();

    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProducts(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setProducts(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setProducts(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading };
};

// Real-time hook for community posts
export const useRealtimeCommunityPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles!inner(display_name, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({ title: "Error fetching posts", description: error.message, variant: "destructive" });
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();

    const channel = supabase
      .channel('posts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_posts'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          // Fetch the new post with profile data
          supabase
            .from('community_posts')
            .select(`
              *,
              profiles!inner(display_name, avatar_url)
            `)
            .eq('id', payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) {
                setPosts(prev => [data, ...prev]);
              }
            });
        } else if (payload.eventType === 'UPDATE') {
          setPosts(prev => prev.map(item => 
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setPosts(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { posts, loading };
};

// Real-time hook for user's cart
export const useRealtimeCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products(*)
        `)
        .eq('user_id', user.id);
      
      if (error) {
        toast({ title: "Error fetching cart", description: error.message, variant: "destructive" });
      } else {
        setCartItems(data || []);
      }
      setLoading(false);
    };

    fetchCart();

    const channel = supabase
      .channel('cart-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'cart_items',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          // Fetch the new item with product data
          supabase
            .from('cart_items')
            .select(`
              *,
              products(*)
            `)
            .eq('id', payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) {
                setCartItems(prev => [...prev, data]);
              }
            });
        } else if (payload.eventType === 'UPDATE') {
          setCartItems(prev => prev.map(item => 
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setCartItems(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { cartItems, loading };
};

// Real-time hook for user's bookings
export const useRealtimeBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          experts(name, image_url, title),
          workshops(title, instructor_name)
        `)
        .eq('user_id', user.id)
        .order('scheduled_time', { ascending: true });
      
      if (error) {
        toast({ title: "Error fetching bookings", description: error.message, variant: "destructive" });
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    fetchBookings();

    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          // Fetch the new booking with related data
          supabase
            .from('bookings')
            .select(`
              *,
              experts(name, image_url, title),
              workshops(title, instructor_name)
            `)
            .eq('id', payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) {
                setBookings(prev => [...prev, data]);
              }
            });
        } else if (payload.eventType === 'UPDATE') {
          setBookings(prev => prev.map(item => 
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setBookings(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { bookings, loading };
};