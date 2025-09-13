import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkshopsTab } from "@/components/WorkshopsTab";
import { ExpertsTab } from "@/components/ExpertsTab";
import { KnowledgeHubTab } from "@/components/KnowledgeHubTab";
import { BookingsTab } from "@/components/BookingsTab";
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react";


const Wellness = () => {
  return (
    <div className="min-h-screen wellness-spa-theme pb-24">
      <Header userName="Wellness Seeker" points={245} />
      
      {/* Header */}
      <div className="p-4 text-center wellness-spa-theme">
        <div className="text-foreground py-6">
          <h1 className="text-3xl font-bold font-devanagari mb-2 text-[hsl(var(--wellness-spa-accent))]">
            आरोग्यमन्दिर
          </h1>
          <p className="text-lg font-medium text-[hsl(var(--wellness-spa-accent))/80]">Temple of Wellness</p>
          <p className="text-sm text-muted-foreground mt-1">Expert guidance for your holistic journey</p>
        </div>
      </div>

      {/* Tabbed Interface */}
      <div className="p-4">
        <Tabs defaultValue="workshops" className="w-full">
          <TabsList className="premium-tabs grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="workshops" className="premium-tab-trigger flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Workshops</span>
            </TabsTrigger>
            <TabsTrigger value="experts" className="premium-tab-trigger flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Experts</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="premium-tab-trigger flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="premium-tab-trigger flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workshops" className="animate-fade-in">
            <WorkshopsTab />
          </TabsContent>

          <TabsContent value="experts" className="animate-fade-in">
            <ExpertsTab />
          </TabsContent>

          <TabsContent value="knowledge" className="animate-fade-in">
            <KnowledgeHubTab />
          </TabsContent>

          <TabsContent value="bookings" className="animate-fade-in">
            <BookingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </div>
  );
};

export default Wellness;