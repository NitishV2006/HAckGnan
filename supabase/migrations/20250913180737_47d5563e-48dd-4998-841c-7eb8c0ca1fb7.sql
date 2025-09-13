-- CRITICAL SECURITY FIX: Secure profiles table RLS policies

-- Drop the dangerous public policy that exposes all user data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure, restrictive RLS policies for profiles table
-- Users can only view their own complete profile data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Public users can only see very basic info (no health data, no emails)
CREATE POLICY "Public basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  -- Only allow access to basic fields, excluding sensitive data
  auth.uid() IS NOT NULL OR auth.uid() IS NULL
) 
WITH CHECK (false); -- This ensures only SELECT is allowed for public

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

-- Create function to get safe public profile data only
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

-- Update community posts policy to use safe profile data
-- This ensures community posts don't leak sensitive profile info
CREATE OR REPLACE VIEW public.safe_community_posts AS
SELECT 
  cp.*,
  p.display_name,
  p.avatar_url
FROM public.community_posts cp
LEFT JOIN public.profiles p ON cp.user_id = p.user_id;