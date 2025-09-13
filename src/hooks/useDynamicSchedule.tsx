import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
  category: 'food' | 'body' | 'mind' | 'eco';
  points: number;
  completed: boolean;
  icon: string;
}

export interface DailySchedule {
  morning: ScheduleTask[];
  afternoon: ScheduleTask[];
  evening: ScheduleTask[];
  night: ScheduleTask[];
}

const TIME_SLOT_INFO = {
  morning: { emoji: '🌅', label: 'Morning', timeRange: 'Wake up → 10 AM' },
  afternoon: { emoji: '☀️', label: 'Afternoon', timeRange: '10 AM → 4 PM' },
  evening: { emoji: '🌇', label: 'Evening', timeRange: '4 PM → 8 PM' },
  night: { emoji: '🌙', label: 'Night', timeRange: '8 PM → Sleep' },
};

export const useDynamicSchedule = (userId: string | undefined) => {
  const [schedule, setSchedule] = useState<DailySchedule>({
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  });
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    if (userId) {
      fetchProfileAndGenerateSchedule();
    }
  }, [userId]);

  const fetchProfileAndGenerateSchedule = async () => {
    if (!userId) return;

    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      setProfile(profileData);
      const day = profileData.current_day || 1;
      setCurrentDay(day);
      
      // Fetch completed tasks for today
      const today = new Date().toISOString().split('T')[0];
      const { data: completions } = await supabase
        .from('daily_task_completions')
        .select('task_id')
        .eq('user_id', userId)
        .eq('date', today);

      const completedTaskIds = new Set(completions?.map(c => c.task_id) || []);
      
      const generatedSchedule = generateDailySchedule(profileData, day, completedTaskIds);
      setSchedule(generatedSchedule);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDailySchedule = (
    profile: Tables<'profiles'>, 
    day: number, 
    completedTaskIds: Set<string>
  ): DailySchedule => {
    const tasks: DailySchedule = {
      morning: [],
      afternoon: [],
      evening: [],
      night: []
    };

    // Generate tasks based on user profile and progressive difficulty
    const baseIntensity = Math.min(day / 30, 1); // 0 to 1 based on day
    
    // Morning tasks
    tasks.morning = generateMorningTasks(profile, day, baseIntensity, completedTaskIds);
    tasks.afternoon = generateAfternoonTasks(profile, day, baseIntensity, completedTaskIds);
    tasks.evening = generateEveningTasks(profile, day, baseIntensity, completedTaskIds);
    tasks.night = generateNightTasks(profile, day, baseIntensity, completedTaskIds);

    return tasks;
  };

  const generateMorningTasks = (
    profile: Tables<'profiles'>, 
    day: number, 
    intensity: number,
    completedTaskIds: Set<string>
  ): ScheduleTask[] => {
    const tasks: ScheduleTask[] = [];
    const taskId = `morning-hydration-${day}`;
    
    // Always include hydration
    tasks.push({
      id: taskId,
      title: day < 10 ? 'Drink warm water with lemon' : 'Morning detox water',
      description: day < 10 ? 'Start your day with 1 glass of warm lemon water' : 'Try cucumber mint water or ginger lemon',
      timeSlot: 'morning',
      category: 'body',
      points: 15,
      completed: completedTaskIds.has(taskId),
      icon: '🍋'
    });

    // Add meditation based on stress levels and day progression
    if (profile.stress_frequency !== 'rarely' || day > 5) {
      const meditationId = `morning-meditation-${day}`;
      tasks.push({
        id: meditationId,
        title: day < 15 ? '5-min breathing exercise' : '10-min meditation',
        description: day < 15 ? 'Simple deep breathing to start your day' : 'Guided meditation or mindfulness practice',
        timeSlot: 'morning',
        category: 'mind',
        points: 20 + Math.floor(intensity * 10),
        completed: completedTaskIds.has(meditationId),
        icon: '🧘'
      });
    }

    // Natural skincare routine
    const skincareId = `morning-skincare-${day}`;
    tasks.push({
      id: skincareId,
      title: 'Natural face wash',
      description: day < 20 ? 'Use gentle, natural face cleanser' : 'Try DIY face pack with natural ingredients',
      timeSlot: 'morning',
      category: 'body',
      points: 10,
      completed: completedTaskIds.has(skincareId),
      icon: '🌿'
    });

    return tasks;
  };

  const generateAfternoonTasks = (
    profile: Tables<'profiles'>, 
    day: number, 
    intensity: number,
    completedTaskIds: Set<string>
  ): ScheduleTask[] => {
    const tasks: ScheduleTask[] = [];

    // Meal guidance based on diet type and goals
    const mealId = `afternoon-meal-${day}`;
    let mealTitle = 'Healthy lunch';
    let mealDesc = 'Balanced meal with vegetables';
    
    if (profile.diet_type === 'vegetarian' || profile.diet_type === 'vegan') {
      mealTitle = day < 10 ? 'Simple salad bowl' : 'Power bowl with quinoa';
      mealDesc = day < 10 ? 'Mixed greens with seasonal vegetables' : 'Quinoa, roasted vegetables, and tahini dressing';
    }

    tasks.push({
      id: mealId,
      title: mealTitle,
      description: mealDesc,
      timeSlot: 'afternoon',
      category: 'food',
      points: 25,
      completed: completedTaskIds.has(mealId),
      icon: '🥗'
    });

    // Hydration reminder
    const hydrationId = `afternoon-hydration-${day}`;
    tasks.push({
      id: hydrationId,
      title: 'Stay hydrated',
      description: 'Drink 2 glasses of water or herbal tea',
      timeSlot: 'afternoon',
      category: 'body',
      points: 10,
      completed: completedTaskIds.has(hydrationId),
      icon: '💧'
    });

    // Digital detox (progressive difficulty)
    if (day > 7) {
      const detoxId = `afternoon-detox-${day}`;
      tasks.push({
        id: detoxId,
        title: day < 20 ? '15-min phone break' : '30-min digital detox',
        description: day < 20 ? 'Stay away from screens for 15 minutes' : 'Complete digital break - read or meditate instead',
        timeSlot: 'afternoon',
        category: 'mind',
        points: 15 + Math.floor(intensity * 10),
        completed: completedTaskIds.has(detoxId),
        icon: '📵'
      });
    }

    return tasks;
  };

  const generateEveningTasks = (
    profile: Tables<'profiles'>, 
    day: number, 
    intensity: number,
    completedTaskIds: Set<string>
  ): ScheduleTask[] => {
    const tasks: ScheduleTask[] = [];

    // Fitness activity based on goals
    const fitnessId = `evening-fitness-${day}`;
    let fitnessTitle = '20-min walk';
    let fitnessDesc = 'Gentle evening walk outdoors';

    if (profile.fitness_goals?.includes('build_strength') && day > 10) {
      fitnessTitle = '15-min strength training';
      fitnessDesc = 'Bodyweight exercises or light weights';
    } else if (profile.fitness_goals?.includes('flexibility') || day > 15) {
      fitnessTitle = '20-min yoga session';
      fitnessDesc = 'Gentle yoga flow for flexibility and relaxation';
    }

    tasks.push({
      id: fitnessId,
      title: fitnessTitle,
      description: fitnessDesc,
      timeSlot: 'evening',
      category: 'body',
      points: 30,
      completed: completedTaskIds.has(fitnessId),
      icon: '🧘'
    });

    // Eco-friendly habit
    if (profile.eco_habits && profile.eco_habits.length > 0 || day > 5) {
      const ecoId = `evening-eco-${day}`;
      const ecoTasks = [
        { title: 'Switch off unused lights', desc: 'Turn off lights in rooms not in use', icon: '💡' },
        { title: 'Use reusable water bottle', desc: 'Refill your bottle instead of using plastic', icon: '♻️' },
        { title: 'Segregate waste', desc: 'Separate recyclables from general waste', icon: '🗂️' },
        { title: 'Use eco-friendly products', desc: 'Choose natural cleaning products today', icon: '🌱' }
      ];
      
      const taskIndex = day % ecoTasks.length;
      const selectedEcoTask = ecoTasks[taskIndex];
      
      tasks.push({
        id: ecoId,
        title: selectedEcoTask.title,
        description: selectedEcoTask.desc,
        timeSlot: 'evening',
        category: 'eco',
        points: 20,
        completed: completedTaskIds.has(ecoId),
        icon: selectedEcoTask.icon
      });
    }

    // Herbal tea for relaxation
    const teaId = `evening-tea-${day}`;
    tasks.push({
      id: teaId,
      title: 'Herbal tea break',
      description: day < 15 ? 'Chamomile or ginger tea' : 'Try turmeric milk or ashwagandha tea',
      timeSlot: 'evening',
      category: 'body',
      points: 15,
      completed: completedTaskIds.has(teaId),
      icon: '🍵'
    });

    return tasks;
  };

  const generateNightTasks = (
    profile: Tables<'profiles'>, 
    day: number, 
    intensity: number,
    completedTaskIds: Set<string>
  ): ScheduleTask[] => {
    const tasks: ScheduleTask[] = [];

    // Night skincare routine (enhanced for poor sleep)
    const skincareId = `night-skincare-${day}`;
    const needsSleepHelp = profile.sleep_quality === 'poor';
    
    tasks.push({
      id: skincareId,
      title: needsSleepHelp ? 'Relaxing oil massage' : 'Night skincare routine',
      description: needsSleepHelp ? 'Self-massage with coconut/sesame oil' : 'Natural moisturizer and gentle cleansing',
      timeSlot: 'night',
      category: 'body',
      points: 15,
      completed: completedTaskIds.has(skincareId),
      icon: '💆'
    });

    // Journaling/gratitude (progressive)
    if (day > 3) {
      const journalId = `night-journal-${day}`;
      tasks.push({
        id: journalId,
        title: day < 14 ? 'Gratitude practice' : 'Reflection journal',
        description: day < 14 ? 'Write 3 things you\'re grateful for' : 'Reflect on the day and set tomorrow\'s intention',
        timeSlot: 'night',
        category: 'mind',
        points: 20,
        completed: completedTaskIds.has(journalId),
        icon: '✍️'
      });
    }

    // Digital detox before bed (crucial for sleep issues)
    const detoxId = `night-detox-${day}`;
    const detoxDuration = needsSleepHelp ? '1 hour' : '30 minutes';
    
    tasks.push({
      id: detoxId,
      title: `Digital detox ${detoxDuration} before bed`,
      description: needsSleepHelp ? 'No screens 1 hour before sleep' : 'Put devices away 30 minutes before bed',
      timeSlot: 'night',
      category: 'mind',
      points: 25,
      completed: completedTaskIds.has(detoxId),
      icon: '📵'
    });

    return tasks;
  };

  const markTaskComplete = async (taskId: string, points: number) => {
    if (!userId) return;

    try {
      // Add to completions table
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from('daily_task_completions')
        .insert({
          user_id: userId,
          task_id: taskId,
          date: today,
          points_earned: points
        });

      // Update local state
      setSchedule(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(timeSlot => {
          updated[timeSlot as keyof DailySchedule] = updated[timeSlot as keyof DailySchedule].map(task =>
            task.id === taskId ? { ...task, completed: true } : task
          );
        });
        return updated;
      });

      // Update user points
      if (profile) {
        const newPoints = (profile.total_points || 0) + points;
        await supabase
          .from('profiles')
          .update({ total_points: newPoints })
          .eq('user_id', userId);
      }

    } catch (error) {
      console.error('Error marking task complete:', error);
    }
  };

  const advanceDay = async () => {
    if (!userId) return;

    try {
      const newDay = currentDay + 1;
      await supabase
        .from('profiles')
        .update({ current_day: newDay })
        .eq('user_id', userId);
      
      setCurrentDay(newDay);
      await fetchProfileAndGenerateSchedule();
    } catch (error) {
      console.error('Error advancing day:', error);
    }
  };

  return {
    schedule,
    profile,
    loading,
    currentDay,
    markTaskComplete,
    advanceDay,
    timeSlotInfo: TIME_SLOT_INFO,
    refreshSchedule: fetchProfileAndGenerateSchedule
  };
};