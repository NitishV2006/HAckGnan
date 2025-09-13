import { Calendar, Clock, Users, Star, Filter, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRealtimeWorkshops } from "@/hooks/useRealtimeData";
import { useBookingActions } from "@/hooks/useBookingActions";

export const WorkshopsTab = () => {
  const { workshops, loading } = useRealtimeWorkshops();
  const { bookWorkshop, loading: bookingLoading } = useBookingActions();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    { id: "all", name: "All", icon: "🧘" },
    { id: "yoga", name: "Yoga", icon: "🧘‍♀️" },
    { id: "meditation", name: "Meditation", icon: "🧠" },
    { id: "ayurveda", name: "Ayurveda", icon: "🌿" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "food", name: "Food", icon: "🥗" },
    { id: "mental-health", name: "Mental Health", icon: "💚" }
  ];

  const handleBookWorkshop = async (workshopId: string, price: number) => {
    const scheduledTime = new Date().toISOString(); // In real app, this would be workshop start time
    await bookWorkshop(workshopId, scheduledTime, price);
  };

  const filteredWorkshops = workshops.filter(workshop => 
    (activeCategory === "All" || workshop.category?.toLowerCase() === activeCategory.toLowerCase()) &&
    (searchQuery === "" || 
     workshop.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     workshop.instructor_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workshops or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={activeCategory === category.name ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.name)}
            className="whitespace-nowrap"
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live">Live & Upcoming</TabsTrigger>
          <TabsTrigger value="recorded">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredWorkshops.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No workshops available</p>
                </CardContent>
              </Card>
            ) : (
              filteredWorkshops.map((workshop) => (
                <Card key={workshop.id} className="hover-scale group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-wellness-primary/10 flex items-center justify-center text-xl font-bold text-wellness-primary">
                          {workshop.instructor_name?.substring(0, 2) || '👤'}
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{workshop.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">by {workshop.instructor_name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {workshop.is_live ? (
                          <Badge variant="destructive" className="animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                            LIVE
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            {workshop.start_time ? new Date(workshop.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{workshop.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{workshop.duration_minutes} mins</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{workshop.current_participants}/{workshop.max_participants}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{workshop.price}</div>
                        <div className="text-xs text-muted-foreground">50 points redeemable</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {workshop.is_live ? (
                        <Button 
                          className="flex-1" 
                          size="lg"
                          onClick={() => handleBookWorkshop(workshop.id, workshop.price)}
                          disabled={bookingLoading}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Join Live
                        </Button>
                      ) : (
                        <Button 
                          className="flex-1" 
                          size="lg"
                          onClick={() => handleBookWorkshop(workshop.id, workshop.price)}
                          disabled={bookingLoading || workshop.current_participants >= workshop.max_participants}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {workshop.current_participants >= workshop.max_participants ? 'Full' : 'Book Now'}
                        </Button>
                      )}
                      <Button variant="outline" size="lg">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recorded" className="space-y-4 mt-6">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Workshop library coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};