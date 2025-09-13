import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Clock, Utensils, Moon, Heart, Dumbbell, Brain, Leaf, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingProps {
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

export const Onboarding = ({ onComplete }: OnboardingProps) => {
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

  // Additional options for comprehensive data collection
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

  const mentalHealthOptions = [
    { emoji: "😊", label: "Generally good mood", value: "good" },
    { emoji: "😐", label: "Occasional stress", value: "moderate" },
    { emoji: "😟", label: "Frequent anxiety/stress", value: "anxious" },
    { emoji: "😔", label: "Often feel low/sad", value: "low" },
  ];

  const ecoInterestOptions = [
    { emoji: "🌱", label: "Very Interested", value: "high" },
    { emoji: "🤔", label: "Somewhat Interested", value: "medium" },
    { emoji: "😐", label: "Slightly Interested", value: "low" },
    { emoji: "🤷", label: "Not Sure", value: "unsure" },
  ];

  const ecoHabitOptions = [
    { emoji: "♻️", label: "Recycling waste", value: "recycling" },
    { emoji: "🌱", label: "Using eco-friendly products", value: "eco-products" },
    { emoji: "🚲", label: "Walking / cycling / public transport", value: "transport" },
    { emoji: "🌍", label: "Conscious shopping (organic, sustainable)", value: "shopping" },
    { emoji: "🚫", label: "None yet (want to start)", value: "none" },
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
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          wake_time: formData.wakeTime,
          sleep_time: formData.sleepTime,
          diet_type: formData.dietType,
          meals_per_day: parseInt(formData.mealsPerDay) || null,
          sleep_quality: formData.sleepQuality,
          health_conditions: formData.healthConditions,
          fitness_goals: formData.fitnessGoals,
          relaxation_methods: formData.relaxationMethods,
          stress_frequency: formData.stressFrequency,
          eco_habits: formData.ecoHabits,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Welcome to Sarvagnan! 🌿",
        description: "Your personalized wellness journey begins now!",
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
      case 1: // Daily Routine
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
          </div>
        );

      case 2: // Eating Habits
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
          </div>
        );

      case 3: // Sleep & Health
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 4: // Fitness Goals
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What's your main goal? (select all that apply)</h3>
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
          </div>
        );

      case 7: // Summary
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold text-primary font-devanagari">
              Here's your personalized Sarvagnan 30-Day Journey
            </h3>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Your Goals</h4>
                  <div className="text-sm text-muted-foreground">
                    {formData.fitnessGoals.length > 0 
                      ? formData.fitnessGoals.map(goal => 
                          fitnessGoalOptions.find(opt => opt.value === goal)?.label
                        ).join(', ')
                      : 'Building healthy habits'
                    }
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Focus Areas</h4>
                  <div className="text-sm text-muted-foreground">
                    {formData.sleepQuality === 'poor' && 'Better Sleep, '}
                    {formData.stressFrequency === 'often' && 'Stress Management, '}
                    {formData.ecoHabits.includes('none') && 'Eco Living, '}
                    Organic Wellness
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Based on your preferences, we've created a personalized 30-day journey with 
                  daily tasks, wellness tips, and eco-friendly challenges tailored just for you.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md wellness-card">
        <CardHeader className="text-center">
          <div className="text-3xl mb-2">🌿</div>
          <CardTitle className="font-devanagari text-primary">
            सर्वज्ञान Onboarding
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Let's personalize your wellness journey
          </p>
          <Progress value={progress} className="mt-4" />
          <p className="text-xs text-muted-foreground mt-1">
            Step {currentStep} of {steps.length}
          </p>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {React.createElement(steps[currentStep - 1].icon, {
                className: "h-5 w-5 text-primary"
              })}
              <h3 className="font-semibold">
                {steps[currentStep - 1].title}
              </h3>
            </div>
            
            {renderStep()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <Button onClick={handleNext} disabled={isSubmitting}>
              {currentStep === steps.length ? 
                (isSubmitting ? "Starting Your Journey..." : "Start My Journey") 
                : "Next"
              }
              {currentStep < steps.length && (
                <ArrowRight className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};