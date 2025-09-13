-- CRITICAL SECURITY FIX: Secure profiles table RLS policies (Corrected)

-- Drop the dangerous public policy that exposes all user data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure, restrictive RLS policy for profiles table
-- Users can only view their own complete profile data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Clean up exposed email addresses in display_name fields
-- Replace email addresses with safe display names
UPDATE public.profiles 
SET display_name = CASE 
  WHEN display_name LIKE '%@%' THEN 
    COALESCE(
      -- Try to extract name before @ symbol and capitalize
      INITCAP(split_part(display_name, '@', 1)),
      'User'
    )
  ELSE display_name 
END
WHERE display_name LIKE '%@%';

-- Create function to get safe public profile data only (for community features)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  total_points INTEGER,
  current_streak INTEGER,
  join_date DATE
) 
LANGUAGE SQL 
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.user_id,
    p.display_name,
    p.avatar_url,
    p.bio,
    p.total_points,
    p.current_streak,
    p.join_date
  FROM public.profiles p
  WHERE p.user_id = profile_user_id;
$$;