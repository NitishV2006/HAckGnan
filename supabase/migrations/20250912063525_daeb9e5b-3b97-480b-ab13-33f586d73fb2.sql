-- Create database functions for various actions

-- Function to increment workshop participants
CREATE OR REPLACE FUNCTION increment_workshop_participants(workshop_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.workshops 
  SET current_participants = current_participants + 1 
  WHERE id = workshop_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to deduct user points
CREATE OR REPLACE FUNCTION deduct_user_points(user_id UUID, points_to_deduct INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles 
  SET total_points = GREATEST(0, total_points - points_to_deduct)
  WHERE user_id = deduct_user_points.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment post likes
CREATE OR REPLACE FUNCTION increment_post_likes(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.community_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment post shares
CREATE OR REPLACE FUNCTION increment_post_shares(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.community_posts 
  SET shares_count = shares_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment group members
CREATE OR REPLACE FUNCTION increment_group_members(group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.community_groups 
  SET members_count = members_count + 1 
  WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement group members
CREATE OR REPLACE FUNCTION decrement_group_members(group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.community_groups 
  SET members_count = GREATEST(0, members_count - 1)
  WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;