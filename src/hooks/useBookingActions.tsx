import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useBookingActions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const bookWorkshop = async (workshopId: string, scheduledTime: string, amount: number, pointsUsed: number = 0) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to book workshops", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          workshop_id: workshopId,
          booking_type: 'workshop',
          scheduled_time: scheduledTime,
          amount_paid: amount,
          points_used: pointsUsed,
          status: 'confirmed'
        });

      if (error) throw error;

      // Update workshop participant count
      const { error: updateError } = await supabase.rpc('increment_workshop_participants', {
        workshop_id: workshopId
      });

      if (updateError) console.warn('Failed to update participant count:', updateError);

      // Deduct points from user profile if used
      if (pointsUsed > 0) {
        const { error: pointsError } = await supabase.rpc('deduct_user_points', {
          user_id: user.id,
          points_to_deduct: pointsUsed
        });

        if (pointsError) console.warn('Failed to deduct points:', pointsError);
      }

      toast({ 
        title: "Workshop booked successfully! 🎉", 
        description: "You'll receive a confirmation email shortly.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const bookExpert = async (expertId: string, scheduledTime: string, duration: number, amount: number, pointsUsed: number = 0) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to book consultations", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          expert_id: expertId,
          booking_type: 'expert',
          scheduled_time: scheduledTime,
          duration_minutes: duration,
          amount_paid: amount,
          points_used: pointsUsed,
          status: 'confirmed'
        });

      if (error) throw error;

      // Deduct points from user profile if used
      if (pointsUsed > 0) {
        const { error: pointsError } = await supabase.rpc('deduct_user_points', {
          user_id: user.id,
          points_to_deduct: pointsUsed
        });

        if (pointsError) console.warn('Failed to deduct points:', pointsError);
      }

      toast({ 
        title: "Consultation booked successfully! 🎉", 
        description: "You'll receive a confirmation email with meeting details.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to manage bookings", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ 
        title: "Booking cancelled", 
        description: "Your booking has been cancelled successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({ title: "Cancellation failed", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookWorkshop,
    bookExpert,
    cancelBooking,
    loading
  };
};