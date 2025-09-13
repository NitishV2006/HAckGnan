-- Add onboarding data fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN wake_time TEXT,
ADD COLUMN sleep_time TEXT,
ADD COLUMN diet_type TEXT,
ADD COLUMN meals_per_day INTEGER,
ADD COLUMN sleep_quality TEXT,
ADD COLUMN health_conditions TEXT[],
ADD COLUMN fitness_goals TEXT[],
ADD COLUMN relaxation_methods TEXT[],
ADD COLUMN stress_frequency TEXT,
ADD COLUMN eco_habits TEXT[];