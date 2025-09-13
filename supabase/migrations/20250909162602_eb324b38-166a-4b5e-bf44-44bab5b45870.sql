-- Add fields to track daily schedule progress and journey
ALTER TABLE public.profiles 
ADD COLUMN current_day integer DEFAULT 1,
ADD COLUMN journey_start_date date DEFAULT CURRENT_DATE,
ADD COLUMN daily_completion_history jsonb DEFAULT '{}';

-- Add a table to track daily task completions
CREATE TABLE public.daily_task_completions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  task_id text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  completed_at timestamp with time zone DEFAULT now(),
  points_earned integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.daily_task_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for daily task completions
CREATE POLICY "Users can view their own task completions" 
ON public.daily_task_completions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own task completions" 
ON public.daily_task_completions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own task completions" 
ON public.daily_task_completions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_daily_task_completions_user_date 
ON public.daily_task_completions(user_id, date);

-- Add trigger for updating updated_at
CREATE TRIGGER update_daily_task_completions_updated_at
BEFORE UPDATE ON public.daily_task_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();