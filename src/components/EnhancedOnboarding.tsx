import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Clock, Utensils, Moon, Heart, Dumbbell, Brain, Leaf, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface EnhancedOnboardingProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: "Daily Routine & Work", icon: Clock },
  { id: 2, title: "Eating Habits & Allergies", icon: Utensils },
  { id: 3, title: "Sleep & Health Conditions", icon: Moon },
  { id: 4, title: "Fitness & Physical Activity", icon: Dumbbell },
  { id: 5, title: "Mental Wellness", icon: Brain },
  { id: 6, title: "Eco-Friendly Living", icon: Leaf },
  { id: 7, title: "Personal Challenges", icon: Heart },
  { id: 8, title: "Your 30-Day Challenge Preview", icon: CheckCircle },
];

export const EnhancedOnboarding = ({ onComplete }: EnhancedOnboardingProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Daily Routine & Work
    wakeTime: "",
    sleepTime: "",
    workSchedule: "",
    physicalActivityLevel: "",
    routineChallenges: "",
    
    // Eating Habits & Allergies
    dietType: "",
    mealsPerDay: "",
    allergies: [] as string[],
    processedFoodFrequency: "",
    foodProblems: "",
    
    // Sleep & Health
    sleepDuration: "",
    sleepQuality: "",
    healthConditions: [] as string[],
    mentalHealthStatus: "",
    otherHealthIssues: "",
    
    // Fitness & Activity
    fitnessGoals: [] as string[],
    fitnessBarriers: "",
    currentActivityLevel: "",
    
    // Mental Wellness
    relaxationMethods: [] as string[],
    stressFrequency: "",
    mentalHealthConcerns: "",
    
    // Eco-Friendly Living
    ecoHabits: [] as string[],
    ecoInterestLevel: "",
    ecoChallenges: "",
  });

  // Option arrays
  const wakeTimeOptions = [
    { emoji: "🌅", label: "Early Morning (4–6 AM)", value: "early" },
    { emoji: "☀️", label: "Morning (6–8 AM)", value: "morning" },
    { emoji: "🌤️", label: "Late Morning (After 8 AM)", value: "late" },
  ];

  const sleepTimeOptions = [
    { emoji: "🌙", label: "Before 10 PM", value: "early" },
    { emoji: "🌌", label: "10 PM – Midnight", value: "normal" },
    { emoji: "🌃", label: "After Midnight", value: "late" },
  ];

  const workScheduleOptions = [
    { emoji: "🏢", label: "Regular 9-5 Office Job", value: "office" },
    { emoji: "🏠", label: "Remote Work / Work from Home", value: "remote" },
    { emoji: "🌙", label: "Shift Work (Night/Evening)", value: "shift" },
    { emoji: "🔄", label: "Irregular Schedule", value: "irregular" },
    { emoji: "👨‍💼", label: "Self-Employed / Freelancer", value: "self-employed" },
  ];

  const activityLevelOptions = [
    { emoji: "🪑", label: "Sedentary (Mostly sitting)", value: "sedentary" },
    { emoji: "🚶", label: "Light Activity (Some walking)", value: "light" },
    { emoji: "🏃", label: "Moderate Activity (Regular exercise)", value: "moderate" },
    { emoji: "💪", label: "High Activity (Very active lifestyle)", value: "high" },
  ];

  const dietOptions = [
    { emoji: "🥗", label: "Vegetarian", value: "vegetarian" },
    { emoji: "🍗", label: "Non-Vegetarian", value: "non-vegetarian" },
    { emoji: "🥬", label: "Vegan", value: "vegan" },
    { emoji: "🍳", label: "Eggetarian", value: "eggetarian" },
  ];

  const mealsOptions = [
    { emoji: "🍽️", label: "2", value: "2" },
    { emoji: "🍽️", label: "3", value: "3" },
    { emoji: "🍽️", label: "4+", value: "4+" },
  ];

  const allergyOptions = [
    { emoji: "🥜", label: "Nuts", value: "nuts" },
    { emoji: "🥛", label: "Dairy", value: "dairy" },
    { emoji: "🌾", label: "Gluten", value: "gluten" },
    { emoji: "🦐", label: "Shellfish", value: "shellfish" },
    { emoji: "🥚", label: "Eggs", value: "eggs" },
    { emoji: "🍓", label: "Fruits", value: "fruits" },
    { emoji: "✅", label: "No known allergies", value: "none" },
  ];

  const processedFoodOptions = [
    { emoji: "🥗", label: "Rarely (Mostly fresh foods)", value: "rarely" },
    { emoji: "📦", label: "Sometimes (Occasional packaged items)", value: "sometimes" },
    { emoji: "🍕", label: "Often (Regular processed meals)", value: "often" },
    { emoji: "🥤", label: "Very Often (Mostly packaged/fast food)", value: "very-often" },
  ];

  const sleepDurationOptions = [
    { emoji: "😪", label: "Less than 5 hours", value: "under-5" },
    { emoji: "😴", label: "5-6 hours", value: "5-6" },
    { emoji: "😊", label: "7-8 hours", value: "7-8" },
    { emoji: "😌", label: "More than 8 hours", value: "over-8" },
  ];

  const sleepQualityOptions = [
    { emoji: "😴", label: "Excellent (7–8 hrs, refreshing)", value: "excellent" },
    { emoji: "🙂", label: "Average (5–6 hrs, sometimes restless)", value: "average" },
    { emoji: "😟", label: "Poor (less than 5 hrs, disturbed)", value: "poor" },
  ];

  const healthConditionOptions = [
    { emoji: "🩺", label: "No major issues", value: "none" },
    { emoji: "⚡", label: "Low energy / fatigue", value: "fatigue" },
    { emoji: "⚖️", label: "Weight management", value: "weight" },
    { emoji: "🤕", label: "Digestive issues", value: "digestive" },
    { emoji: "💆", label: "Stress / anxiety", value: "stress" },
    { emoji: "🦴", label: "Joint/Back pain", value: "joint-pain" },
    { emoji: "🫁", label: "Respiratory issues", value: "respiratory" },
  ];

  const mentalHealthOptions = [
    { emoji: "😊", label: "Generally good mood", value: "good" },
    { emoji: "😐", label: "Occasional stress", value: "moderate" },
    { emoji: "😟", label: "Frequent anxiety/stress", value: "anxious" },
    { emoji: "😔", label: "Often feel low/sad", value: "low" },
  ];

  const fitnessGoalOptions = [
    { emoji: "🏋️", label: "Build Strength", value: "strength" },
    { emoji: "🧘", label: "Improve Flexibility & Balance", value: "flexibility" },
    { emoji: "💪", label: "Weight Loss", value: "weight-loss" },
    { emoji: "🍎", label: "Eat Healthier", value: "nutrition" },
    { emoji: "🧠", label: "Improve Mental Health", value: "mental" },
    { emoji: "🌍", label: "Live More Eco-Friendly", value: "eco" },
  ];

  const relaxationOptions = [
    { emoji: "🎵", label: "Music", value: "music" },
    { emoji: "📚", label: "Reading", value: "reading" },
    { emoji: "🧘", label: "Yoga / Meditation", value: "yoga" },
    { emoji: "🎮", label: "Entertainment (games, movies)", value: "entertainment" },
    { emoji: "🚶", label: "Outdoor Walks", value: "walks" },
  ];

  const stressOptions = [
    { emoji: "😌", label: "Rarely", value: "rarely" },
    { emoji: "🙂", label: "Sometimes", value: "sometimes" },
    { emoji: "😟", label: "Often", value: "often" },
  ];

  const ecoHabitOptions = [
    { emoji: "♻️", label: "Recycling waste", value: "recycling" },
    { emoji: "🌱", label: "Using eco-friendly products", value: "eco-products" },
    { emoji: "🚲", label: "Walking / cycling / public transport", value: "transport" },
    { emoji: "🌍", label: "Conscious shopping (organic, sustainable)", value: "shopping" },
    { emoji: "🚫", label: "None yet (want to start)", value: "none" },
  ];

  const ecoInterestOptions = [
    { emoji: "🌱", label: "Very Interested", value: "high" },
    { emoji: "🤔", label: "Somewhat Interested", value: "medium" },
    { emoji: "😐", label: "Slightly Interested", value: "low" },
    { emoji: "🤷", label: "Not Sure", value: "unsure" },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Generate personalized 30-day challenge
      const personalizedChallenge = generatePersonalizedChallenge(formData);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          wake_time: formData.wakeTime,
          sleep_time: formData.sleepTime,
          work_schedule: formData.workSchedule,
          physical_activity_level: formData.physicalActivityLevel,
          routine_challenges: formData.routineChallenges,
          diet_type: formData.dietType,
          meals_per_day: parseInt(formData.mealsPerDay) || null,
          allergies: formData.allergies,
          processed_food_frequency: formData.processedFoodFrequency,
          food_problems: formData.foodProblems,
          sleep_duration: formData.sleepDuration,
          sleep_quality: formData.sleepQuality,
          health_conditions: formData.healthConditions,
          mental_health_status: formData.mentalHealthStatus,
          other_health_issues: formData.otherHealthIssues,
          fitness_goals: formData.fitnessGoals,
          fitness_barriers: formData.fitnessBarriers,
          current_activity_level: formData.currentActivityLevel,
          relaxation_methods: formData.relaxationMethods,
          stress_frequency: formData.stressFrequency,
          mental_health_concerns: formData.mentalHealthConcerns,
          eco_habits: formData.ecoHabits,
          eco_interest_level: formData.ecoInterestLevel,
          eco_challenges: formData.ecoChallenges,
          personalized_challenge: personalizedChallenge,
          challenge_start_date: new Date().toISOString().split('T')[0],
          challenge_preferences: formData,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Welcome to Your Personalized Journey! 🌟",
        description: "Your custom 30-day challenge is ready!",
      });
      
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePersonalizedChallenge = (data: typeof formData) => {
    const challenges = [];
    const totalDays = 30;
    
    // Generate day-by-day challenges based on user input
    for (let day = 1; day <= totalDays; day++) {
      const dailyTasks = [];
      
      // Morning routine based on wake time
      if (data.wakeTime === "early") {
        dailyTasks.push({
          time: "06:00",
          category: "morning",
          task: day <= 10 ? "Practice 5 minutes of morning breathing" : 
                day <= 20 ? "10-minute sunrise meditation" : "15-minute mindful morning routine",
          points: 15,
          reason: "Early risers benefit from grounding morning practices"
        });
      }
      
      // Health condition specific tasks
      if (data.healthConditions.includes("stress")) {
        dailyTasks.push({
          time: "12:00",
          category: "mental",
          task: day % 3 === 0 ? "Practice progressive muscle relaxation" :
                day % 3 === 1 ? "Take 10 deep breaths mindfully" : "Write down 3 things you're grateful for",
          points: 20,
          reason: "Stress management through mindfulness and gratitude practices"
        });
      }
      
      // Diet specific recommendations
      if (data.processedFoodFrequency === "often") {
        dailyTasks.push({
          time: "09:00",
          category: "nutrition",
          task: `Day ${day}: ${day <= 10 ? "Replace one processed snack with fruit" : 
                day <= 20 ? "Prepare one fresh meal instead of packaged" : "Create a full day of whole foods meals"}`,
          points: 25,
          reason: "Gradual transition from processed to whole foods for better health"
        });
      }
      
      // Fitness goals
      if (data.fitnessGoals.includes("strength")) {
        dailyTasks.push({
          time: "17:00",
          category: "fitness",
          task: day <= 10 ? `${5 + Math.floor(day/2)} push-ups or wall push-ups` :
                day <= 20 ? `${10 + day} bodyweight squats` : `Full 20-minute strength circuit`,
          points: 30,
          reason: "Progressive strength building adapted to your fitness level"
        });
      }
      
      // Sleep quality improvement
      if (data.sleepQuality === "poor") {
        dailyTasks.push({
          time: "21:00",
          category: "evening",
          task: day % 4 === 0 ? "No screens 1 hour before bed" :
                day % 4 === 1 ? "Gentle stretching for 10 minutes" :
                day % 4 === 2 ? "Read for 15 minutes" : "Practice gratitude journaling",
          points: 20,
          reason: "Evening routine to improve sleep quality and duration"
        });
      }
      
      // Eco-friendly goals
      if (data.ecoInterestLevel === "high") {
        dailyTasks.push({
          time: "14:00",
          category: "eco",
          task: day <= 7 ? "Use reusable water bottle all day" :
                day <= 14 ? "Choose one eco-friendly product" :
                day <= 21 ? "Reduce plastic usage by one item" : "Share one eco-tip with someone",
          points: 15,
          reason: "Building sustainable habits for environmental consciousness"
        });
      }
      
      challenges.push({
        day,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tasks: dailyTasks,
        totalPoints: dailyTasks.reduce((sum, task) => sum + task.points, 0)
      });
    }
    
    return {
      challenges,
      totalDays,
      estimatedPoints: challenges.reduce((sum, day) => sum + day.totalPoints, 0),
      focus_areas: [
        ...(data.healthConditions.includes("stress") ? ["Stress Management"] : []),
        ...(data.fitnessGoals.length > 0 ? ["Fitness & Strength"] : []),
        ...(data.sleepQuality === "poor" ? ["Sleep Improvement"] : []),
        ...(data.ecoInterestLevel === "high" ? ["Eco-Living"] : []),
        ...(data.processedFoodFrequency === "often" ? ["Nutrition Upgrade"] : [])
      ]
    };
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayOption = (field: string, option: string) => {
    const fieldValue = formData[field as keyof typeof formData] as string[];
    const isSelected = fieldValue.includes(option);
    
    setFormData(prev => ({
      ...prev,
      [field]: isSelected 
        ? fieldValue.filter(item => item !== option)
        : [...fieldValue, option]
    }));
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Daily Routine & Work
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">When do you usually wake up?</h3>
              <div className="grid gap-3">
                {wakeTimeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("wakeTime", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.wakeTime === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">When do you usually go to bed?</h3>
              <div className="grid gap-3">
                {sleepTimeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("sleepTime", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.sleepTime === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">What's your work schedule like?</h3>
              <div className="grid gap-3">
                {workScheduleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("workSchedule", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.workSchedule === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">What's your activity level?</h3>
              <div className="grid gap-3">
                {activityLevelOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("physicalActivityLevel", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.physicalActivityLevel === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">What challenges do you face with your daily routine?</h3>
              <Textarea
                placeholder="Example: I struggle to maintain consistent sleep times due to work stress, or I find it hard to make time for meals..."
                value={formData.routineChallenges}
                onChange={(e) => updateFormData("routineChallenges", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 2: // Eating Habits & Allergies
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What best describes your diet?</h3>
              <div className="grid gap-3">
                {dietOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("dietType", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.dietType === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">How many meals do you eat per day?</h3>
              <div className="grid gap-3">
                {mealsOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("mealsPerDay", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.mealsPerDay === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Do you have any food allergies? (select all that apply)</h3>
              <div className="grid gap-3">
                {allergyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayOption("allergies", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.allergies.includes(option.value)
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">How often do you consume processed/packaged foods?</h3>
              <div className="grid gap-3">
                {processedFoodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("processedFoodFrequency", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.processedFoodFrequency === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Describe any food-related problems you face</h3>
              <Textarea
                placeholder="Example: I have frequent digestive issues, sugar cravings, irregular eating patterns, difficulty cooking healthy meals..."
                value={formData.foodProblems}
                onChange={(e) => updateFormData("foodProblems", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      // Continue with other cases...
      case 3: // Sleep & Health Conditions
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">How many hours do you sleep on average?</h3>
              <div className="grid gap-3">
                {sleepDurationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("sleepDuration", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.sleepDuration === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">How would you describe your sleep quality?</h3>
              <div className="grid gap-3">
                {sleepQualityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("sleepQuality", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.sleepQuality === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Health Conditions (select all that apply)</h3>
              <div className="grid gap-3">
                {healthConditionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayOption("healthConditions", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.healthConditions.includes(option.value)
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">How's your mental health generally?</h3>
              <div className="grid gap-3">
                {mentalHealthOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("mentalHealthStatus", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.mentalHealthStatus === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Describe any other health issues or concerns</h3>
              <Textarea
                placeholder="Example: Frequent headaches, back pain from desk work, seasonal allergies, skin sensitivity..."
                value={formData.otherHealthIssues}
                onChange={(e) => updateFormData("otherHealthIssues", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 4: // Fitness & Physical Activity
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What are your fitness goals? (select all that apply)</h3>
              <div className="grid gap-3">
                {fitnessGoalOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayOption("fitnessGoals", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.fitnessGoals.includes(option.value)
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">What challenges prevent you from achieving these fitness goals?</h3>
              <Textarea
                placeholder="Example: Lack of time, no gym access, knee pain, lack of motivation, work stress..."
                value={formData.fitnessBarriers}
                onChange={(e) => updateFormData("fitnessBarriers", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 5: // Mental Wellness
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">How do you usually relax? (select all that apply)</h3>
              <div className="grid gap-3">
                {relaxationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayOption("relaxationMethods", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.relaxationMethods.includes(option.value)
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Do you feel stressed often?</h3>
              <div className="grid gap-3">
                {stressOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("stressFrequency", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.stressFrequency === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Share any mental health concerns or challenges</h3>
              <Textarea
                placeholder="Example: Work-related stress, difficulty concentrating, social anxiety, sleep-related mood issues..."
                value={formData.mentalHealthConcerns}
                onChange={(e) => updateFormData("mentalHealthConcerns", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 6: // Eco-Friendly Living
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Which eco-habits do you already practice? (select all that apply)</h3>
              <div className="grid gap-3">
                {ecoHabitOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayOption("ecoHabits", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.ecoHabits.includes(option.value)
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">How interested are you in adopting sustainable practices?</h3>
              <div className="grid gap-3">
                {ecoInterestOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("ecoInterestLevel", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.ecoInterestLevel === option.value
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Share your personal challenges in adopting eco-friendly habits</h3>
              <Textarea
                placeholder="Example: Cost of organic products, lack of eco-friendly options nearby, don't know where to start..."
                value={formData.ecoChallenges}
                onChange={(e) => updateFormData("ecoChallenges", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 7: // Personal Challenges Summary
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-primary">Almost Ready!</h2>
            <p className="text-muted-foreground">
              Based on your responses, we're creating a personalized 30-day challenge
              that addresses your specific needs and goals.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-8 text-left">
              <div className="p-4 bg-primary/5 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Your Focus Areas:</h4>
                <ul className="text-sm space-y-1">
                  {formData.healthConditions.includes("stress") && <li>• Stress Management & Mental Wellness</li>}
                  {formData.fitnessGoals.length > 0 && <li>• Fitness & Physical Health</li>}
                  {formData.sleepQuality === "poor" && <li>• Sleep Quality Improvement</li>}
                  {formData.processedFoodFrequency === "often" && <li>• Nutrition & Healthy Eating</li>}
                  {formData.ecoInterestLevel === "high" && <li>• Sustainable Living Practices</li>}
                </ul>
              </div>
              
              <div className="p-4 bg-secondary/10 rounded-xl">
                <h4 className="font-semibold mb-2">What You'll Get:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Daily personalized tasks (30 days)</li>
                  <li>• Progress tracking with points</li>
                  <li>• Explanations for each recommendation</li>
                  <li>• Adaptive challenges that evolve</li>
                  <li>• Community support and tips</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 8: // 30-Day Challenge Preview
        const previewChallenge = generatePersonalizedChallenge(formData);
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Your Personalized 30-Day Challenge</h2>
              <p className="text-muted-foreground">Ready to transform your wellness journey?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Challenge Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Days:</span>
                    <div className="font-semibold">{previewChallenge.totalDays}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Points:</span>
                    <div className="font-semibold">{previewChallenge.estimatedPoints}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-muted-foreground">Focus Areas:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {previewChallenge.focus_areas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border rounded-xl">
                <h4 className="font-semibold mb-4">Sample Day 1 Tasks:</h4>
                <div className="space-y-3">
                  {previewChallenge.challenges[0]?.tasks.slice(0, 3).map((task, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{task.time}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{task.task}</div>
                        <div className="text-xs text-muted-foreground mt-1">{task.reason}</div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+{task.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Your challenge will adapt and evolve based on your progress and feedback!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="wellness-card">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              {React.createElement(steps[currentStep - 1].icon, {
                className: "h-8 w-8 text-primary mr-3"
              })}
              <div>
                <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="pb-6">
            {renderStep()}
          </CardContent>
          
          <div className="flex justify-between items-center p-6 pt-0">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {currentStep === steps.length ? (
                isSubmitting ? "Creating Your Journey..." : "Start My Journey"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};