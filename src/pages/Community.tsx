import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WeeklyChallenge } from "@/components/WeeklyChallenge";
import { WeeklyBadges } from "@/components/WeeklyBadges";
import { CommunityGroups } from "@/components/CommunityGroups";
import { CreatePost } from "@/components/CreatePost";
import { CommunityFeed } from "@/components/CommunityFeed";
import { CommunityFloatingButton } from "@/components/FloatingActionButton";
import { useState } from "react";
import { mockChallenges } from "@/data/mockData";

const groups = [
  { name: "Yoga Enthusiasts", members: 1234, icon: "🧘‍♀️", description: "Asanas, pranayama & mindful living" },
  { name: "Ayurveda Wisdom", members: 987, icon: "🌿", description: "Ancient healing & herbal remedies" },
  { name: "Skin Care Naturally", members: 756, icon: "✨", description: "Natural beauty & skincare secrets" },
  { name: "Mental Health Support", members: 645, icon: "🧠", description: "Mindfulness & emotional wellness" },
  { name: "Eco Living", members: 534, icon: "🌱", description: "Sustainable lifestyle choices" },
];

const weeklyBadges = [
  { name: "Eco Warrior", icon: "🌍", description: "Completed 3+ eco challenges", count: 23 },
  { name: "Wellness Mentor", icon: "🌟", description: "Helped 5+ community members", count: 8 },
  { name: "Consistency Champ", icon: "🏆", description: "7-day streak achievement", count: 45 }
];

const Community = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const currentChallenge = mockChallenges[0];

  return (
    <div className="min-h-screen community-theme pb-24">
      <Header userName="Wellness Seeker" points={745} />
      
      {/* Header */}
      <div className="p-4 text-center community-theme">
        <div className="text-foreground py-6">
          <h1 className="text-3xl font-bold font-devanagari mb-2 text-[hsl(var(--community-accent))]">
            सहचर्यम्
          </h1>
          <p className="text-lg font-medium text-[hsl(var(--community-accent))/80]">Togetherness</p>
          <p className="text-sm text-muted-foreground mt-1">Connect • Learn • Grow Together</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Weekly Challenge Banner */}
        <div className="animate-slide-up">
          <WeeklyChallenge challenge={currentChallenge} />
        </div>

        {/* Weekly Badges */}
        <div className="animate-slide-up delay-100">
          <WeeklyBadges badges={weeklyBadges} />
        </div>

        {/* Join Groups */}
        <div className="animate-slide-up delay-200">
          <CommunityGroups groups={groups} />
        </div>

        {/* Create Post - Show conditionally */}
        {showCreatePost && (
          <div className="animate-slide-up delay-300">
            <CreatePost />
          </div>
        )}

        {/* Community Feed */}
        <div className="animate-slide-up delay-400">
          <CommunityFeed />
        </div>
      </div>

      {/* Floating Action Button */}
      <CommunityFloatingButton 
        onClick={() => setShowCreatePost(!showCreatePost)}
      />

      <Navigation />
    </div>
  );
};

export default Community;