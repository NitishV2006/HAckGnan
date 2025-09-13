-- Add comprehensive user data fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN work_schedule text,
ADD COLUMN physical_activity_level text,
ADD COLUMN routine_challenges text,
ADD COLUMN allergies text[],
ADD COLUMN processed_food_frequency text,
ADD COLUMN food_problems text,
ADD COLUMN sleep_duration text,
ADD COLUMN mental_health_status text,
ADD COLUMN other_health_issues text,
ADD COLUMN fitness_barriers text,
ADD COLUMN current_activity_level text,
ADD COLUMN mental_health_concerns text,
ADD COLUMN eco_interest_level text,
ADD COLUMN eco_challenges text,
ADD COLUMN personalized_challenge jsonb DEFAULT '{}'::jsonb,
ADD COLUMN challenge_start_date date,
ADD COLUMN challenge_preferences jsonb DEFAULT '{}'::jsonb;