import { Star, Calendar, Clock, Video, MessageSquare, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRealtimeExperts } from "@/hooks/useRealtimeData";
import { useBookingActions } from "@/hooks/useBookingActions";

export const ExpertsTab = () => {
  const { experts, loading } = useRealtimeExperts();
  const { bookExpert, loading: bookingLoading } = useBookingActions();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  
  const specialties = [
    "All", "Ayurveda", "Yoga", "Nutrition", "Mental Health", "Fitness", "Skincare"
  ];

  const handleBookExpert = async (expertId: string, hourlyRate: number) => {
    // In real app, this would open a calendar to select time
    const scheduledTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Tomorrow
    await bookExpert(expertId, scheduledTime, 60, hourlyRate);
  };

  const filteredExperts = experts.filter(expert => 
    (activeSpecialty === "All" || expert.specialty?.toLowerCase().includes(activeSpecialty.toLowerCase())) &&
    (searchQuery === "" || 
     expert.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     expert.specialty?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experts or specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Specialties Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty}
            variant={activeSpecialty === specialty ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSpecialty(specialty)}
            className="whitespace-nowrap"
          >
            {specialty}
          </Button>
        ))}
      </div>

      {/* Experts Grid */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredExperts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No experts available</p>
            </CardContent>
          </Card>
        ) : (
          filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover-scale group">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={expert.image_url} />
                    <AvatarFallback className="text-lg font-semibold bg-wellness-primary/10 text-wellness-primary">
                      {expert.name?.substring(0, 2) || '👤'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{expert.name}</h3>
                        <p className="text-wellness-primary font-medium">{expert.title}</p>
                        <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {expert.is_available && (
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                        <Badge variant={expert.is_available ? "default" : "secondary"}>
                          {expert.is_available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{expert.rating}</span>
                        <span className="text-sm text-muted-foreground">({expert.total_reviews} reviews)</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {expert.specialty}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {expert.bio}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>Available for booking</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{expert.hourly_rate}</div>
                        <div className="text-xs text-muted-foreground">per hour</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="flex-1"
                        onClick={() => handleBookExpert(expert.id, expert.hourly_rate)}
                        disabled={bookingLoading || !expert.is_available}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {expert.is_available ? 'Book Consultation' : 'Unavailable'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};